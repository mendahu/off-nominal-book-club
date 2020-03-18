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

      const bookId = knex
        .insert(bookObj.book)
        .returning('id')
        .into('books');

      const authorId = knex
        .insert(bookObj.author)
        .returning('id')
        .into('authors');
        
      return Promise.all([(bookId), authorId])
        .then((ids) => {
          return knex.insert({
            book_id: JSON.parse(ids[0]),
            author_id: JSON.parse(ids[1])
          })
          .into('books_authors')
          .returning(JSON.parse(ids[0]))
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
            WHERE books_authors.book_id = books.id
          ) authors ) AS authors`), 
        knex.raw(`
          ( SELECT json_agg(tag)
          FROM (
            SELECT name AS tag_name, COUNT('user_tag_book.id') as count 
            FROM tags
              JOIN user_tag_book ON tags.id = user_tag_book.tag_id
              JOIN books as b ON user_tag_book.book_id = books.id
            WHERE b.id = books.id
            GROUP BY name
            ORDER BY count DESC
          ) tag ) AS tags`))
        .from('books')
        .where(knex.raw('LOWER("title") LIKE ?', `%${lowerTerm}%`))
        .orWhere(knex.raw('LOWER("description") LIKE ?', `%${lowerTerm}%`))
        .orWhere(knex.raw('LOWER("year") LIKE ?', `%${lowerTerm}%`))

    }
    
  }
}