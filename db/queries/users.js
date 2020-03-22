const knex = require('../knex');

module.exports = {
  users : {

    fetch: (userId, bookId) => {
      const params = {
        bookId,
        userId
      }

      return knex.select(
        knex.raw(`
        ( SELECT json_agg(rating)
          FROM (
            SELECT ratings.id as id, ratings.rating as user_rating
            FROM ratings
            WHERE ratings.user_id = ? AND ratings.book_id = books.id
          ) rating ) as rating`, userId),
          knex.raw(`
          ( SELECT json_agg(review)
            FROM (
              SELECT reviews.id as id, reviews.user_id, users.name as name, reviews.created_at as date, reviews.summary as summary, reviews.review as user_review
              FROM reviews
                JOIN users ON users.id = reviews.user_id
              WHERE reviews.user_id = :userId AND reviews.book_id = books.id
            ) review ) as review`, params),
        knex.raw(`
        ( SELECT json_agg(tags) 
          FROM (
            SELECT tags.id as tag_id,tagrel.id as tag_rel_id, tags.name
            FROM tags
              JOIN user_tag_book as tagrel ON tagrel.tag_id = tags.id
            WHERE tagrel.user_id = ? AND tagrel.book_id = books.id
          ) tags ) as user_tags`, userId),
        knex.raw(`
          (SELECT reads.id
            FROM reads
            WHERE reads.user_id = ? AND reads.book_id = books.id) as read`, userId),
        knex.raw(`
          (SELECT favourites.id
            FROM favourites
            WHERE favourites.user_id = ? AND favourites.book_id = books.id) as fav`, userId),
        knex.raw(`
          (SELECT wishlist.id
            FROM wishlist
            WHERE wishlist.user_id = ? AND wishlist.book_id = books.id) as wishlist`, userId)
        )
        .from('books')
        .where('books.id', bookId)
    },
    getUserData: (userId) => {

      const promises = []

      promises.push(
        knex.raw(`
        SELECT name, email, bio, avatar_url
          FROM users
          WHERE id = ?
        `, userId)
      )

      promises.push(
        knex.raw(`
          SELECT 
            b.id,
            b.title,
            b.image_url,
            authors,
            f.user_id
          FROM books b
          LEFT JOIN (
            SELECT book_id, json_agg(name) AS authors
            FROM authors a
              JOIN books_authors ba ON a.id = ba.author_id
              JOIN books AS b ON ba.book_id = b.id
            GROUP BY book_id
          ) as author_names on author_names.book_id = b.id
          JOIN favourites f on f.book_id = b.id
          WHERE f.user_id = ?
        `, userId)
      )

      promises.push(
        knex.raw(`
        SELECT 
          b.id,
          b.title,
          b.image_url,
          authors,
          r.user_id
        FROM books b
        LEFT JOIN (
          SELECT book_id, json_agg(name) AS authors
          FROM authors a
            JOIN books_authors ba ON a.id = ba.author_id
            JOIN books AS b ON ba.book_id = b.id
          GROUP BY book_id
        ) as author_names on author_names.book_id = b.id
        JOIN reads r on r.book_id = b.id
        WHERE r.user_id = ?
        `, userId)
      )

      promises.push(
        knex.raw(`
          SELECT 
            b.id,
            b.title,
            b.image_url,
            authors,
            w.user_id
          FROM books b
          LEFT JOIN (
            SELECT book_id, json_agg(name) AS authors
            FROM authors a
              JOIN books_authors ba ON a.id = ba.author_id
              JOIN books AS b ON ba.book_id = b.id
            GROUP BY book_id
          ) as author_names on author_names.book_id = b.id
          JOIN wishlist w on w.book_id = b.id
          WHERE w.user_id = ?
        `, userId)
      )

      promises.push(
        knex.raw(`
        SELECT books.id, books.title, rating
          FROM books
          JOIN ratings on book_id = books.id
          WHERE ratings.user_id = ?
        `, userId)
      )

      return Promise.all(promises)
      .then(([userData, favsData, readsData, wishlistData, ratingsData]) => {

        
        const userBooks = {
          user: userData.rows,
          books: {
            favourites: favsData.rows,
            reads: readsData.rows,
            wishlist: wishlistData.rows,
            ratings: ratingsData.rows
          }
        }
        return userBooks
      })
    }

  }
}