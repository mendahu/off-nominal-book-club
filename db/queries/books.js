const knex = require('../knex');

module.exports = {
  books : {
    filter: function(term) {
      const lowerTerm = term.toLowerCase();

      return knex.select().from('books')
        .where(knex.raw('LOWER("title") LIKE ?', `%${lowerTerm}%`))
    },

    confirm: function(bookObj) {
      const lowerTitle = bookObj.title.toLowerCase();

      return knex.select().from('books')
        .where("isbn13", bookObj.isbn13)
        .orWhere("google_id", bookObj.google_id)
        .orWhere(knex.raw('LOWER("title") LIKE ?', `%${lowerTitle}%`))
    },

    add: function(bookObj) {

      const promises = []
      
      promises.push(
        knex
          .insert(bookObj.book)
          .returning('id')
          .into('books')
          .catch(err => console.log(err))
      ) 
      
      const authorsArr = bookObj.authors.map((author) => {
        return { name: author.name}
      })

      promises.push(
        knex('authors')
          .insert(authorsArr)
          .returning('id')
      )
    
      return Promise.all(promises)
        .then(([bookID, authorsIDs]) => {

          const bookAuthors = authorsIDs.map((id) => {
            return {author_id: Number(id), book_id: Number(bookID)}
          })

          return knex('books_authors').insert(bookAuthors).then(() => {
            return bookID
          })
        })
    },

    fetch: function(bookId) {
      return knex.select(
        "books.id", 
        "books.title", 
        "books.fiction",
        "books.google_id",
        "books.isbn13",
        "books.description", 
        "books.year", 
        "books.image_url", 
        knex.raw(`
          ( SELECT json_agg(authors) 
          FROM (
            SELECT name 
            FROM authors
              JOIN books_authors ON authors.id = books_authors.author_id
            WHERE books_authors.book_id = ?
          ) authors ) AS authors`, bookId), 
        knex.raw(`
          ( SELECT json_agg(tag)
          FROM (
            SELECT name AS tag_name, COUNT('user_tag_book.id') as count 
            FROM tags
              JOIN user_tag_book ON tags.id = user_tag_book.tag_id
              JOIN books ON user_tag_book.book_id = books.id
            WHERE books.id = ?
            GROUP BY name
            ORDER BY count DESC
          ) tag ) AS tags`, bookId),
        knex.raw(`
          ( SELECT json_agg(review)
          FROM (
            SELECT reviews.id, reviews.user_id, users.name as name, ratings.rating, reviews.created_at as date, reviews.review as user_review
            FROM reviews
              JOIN users ON reviews.user_id = users.id
              JOIN ratings ON ratings.book_id = reviews.book_id
            WHERE reviews.book_id = ? AND ratings.user_id = reviews.user_id
            ORDER BY date DESC
          ) review ) AS reviews`, bookId))
        .from('books')
        .where('books.id', bookId)
    },

    getAll: function(term) {
      const lowerTerm = term.toLowerCase();
      return knex.raw(`
        SELECT
          b.id,
          b.title,
          b.fiction,
          b.google_id,
          b.isbn13,
          b.description,
          b.year,
          b.image_url,
          ROUND(max(ratings.avg_rating),1) as avg_rating,
          max(author_names.names) AS authors_string,
          max(author_names.names_json::text) AS authors,
          max(tags_info.tags:: text) as tags,
          max(tags_info.tag_string) as tags_string
        FROM books b
          LEFT JOIN (
            SELECT book_id, string_agg(name::character varying, ',') AS names, json_agg(name) AS names_json
              FROM authors a
                JOIN books_authors ba ON a.id = ba.author_id
                JOIN books AS b ON ba.book_id = b.id
              GROUP BY book_id
          ) as author_names ON author_names.book_id = b.id
          LEFT JOIN (
            SELECT book_id, string_agg(tag_name::character varying, ',') as tag_string, json_agg(tag_counts) as tags
              FROM (
                SELECT book_id, name as tag_name, COUNT('user_tag_book.id') AS count
                    FROM tags t
                      JOIN user_tag_book utb ON t.id = utb.tag_id
                      JOIN books AS b ON utb.book_id = b.id
                    GROUP BY book_id, t.name
                    ORDER BY count DESC) as tag_counts
                    GROUP BY book_id) as tags_info on tags_info.book_id = b.id
            LEFT JOIN (
              SELECT ratings.book_id, AVG(rating) as avg_rating
                    FROM reviews
                        JOIN ratings ON ratings.book_id = reviews.book_id
                      GROUP BY ratings.book_id) as ratings on ratings.book_id = b.id       
        WHERE b.title ILIKE '%${lowerTerm}%'
          OR author_names.names ILIKE '%${lowerTerm}%'
          OR tags_info.tag_string ILIKE '%${lowerTerm}%'    
        GROUP BY b.id
      `)
    },
    getTags: function(term) {
      return knex.raw(`
      SELECT name as tag_name, COUNT('user_tag_book.id') AS count
        FROM tags t
          JOIN user_tag_book utb ON t.id = utb.tag_id
          JOIN books AS b ON utb.book_id = b.id
        WHERE t.name ilike '%${term}%'
        GROUP BY t.name
        ORDER BY count DESC
      `)
    },
    selectTag: function(tag) {
      return knex.raw(`
      SELECT
      b.id,
      b.title,
      b.fiction,
      b.google_id,
      b.isbn13,
      b.description,
      b.year,
      b.image_url,
      ROUND(max(ratings.avg_rating),1) as avg_rating,
      max(tags_info.tag_array),
      max(author_names.names) AS authors_string,
      max(author_names.names_json::text) AS authors,
      max(tags_info.tags:: text) as tags,
      max(tags_info.tag_string) as tags_string
    FROM books b
      LEFT JOIN (
        SELECT book_id, string_agg(name::character varying, ',') AS names, json_agg(name) AS names_json
          FROM authors a
            JOIN books_authors ba ON a.id = ba.author_id
            JOIN books AS b ON ba.book_id = b.id
          GROUP BY book_id
      ) as author_names ON author_names.book_id = b.id
      LEFT JOIN (
        SELECT book_id, array_agg(tag_name) as tag_array, string_agg(tag_name::character varying, ',') as tag_string, json_agg(tag_counts) as tags
          FROM (
            SELECT book_id, name as tag_name, COUNT('user_tag_book.id') AS count
                FROM tags t
                  JOIN user_tag_book utb ON t.id = utb.tag_id
                  JOIN books AS b ON utb.book_id = b.id
                GROUP BY book_id, t.name
                ORDER BY count DESC) as tag_counts
                GROUP BY book_id) as tags_info on tags_info.book_id = b.id
      LEFT JOIN (
        SELECT ratings.book_id, AVG(rating) as avg_rating
              FROM reviews
                  JOIN ratings ON ratings.book_id = reviews.book_id
                GROUP BY ratings.book_id) as ratings on ratings.book_id = b.id          
    GROUP BY b.id
    HAVING '${tag}' = ANY(max(tags_info.tag_array))
    `)
    }
    
  }
}

