const knex = require('../knex')

module.exports = {
  readings: {
    fetch: (readingId) => {
      const promises = [];
      
      promises.push(
        knex.raw(`
          SELECT b.id, b.title, authors, date_started, date_ended
          FROM books b
          LEFT JOIN (
            SELECT book_id, json_agg(name) AS authors
            FROM authors a
            JOIN books_authors ba ON a.id = ba.author_id
            JOIN books AS b ON ba.book_id = b.id
            GROUP BY book_id
            ) AS author_names ON author_names.book_id = b.id
            JOIN readings ON readings.book_id = b.id
            WHERE readings.id = ?
            `, readingId)
            )

      promises.push(
        knex.raw(`
        SELECT users.id, users.name, users.avatar_url
        FROM users
        JOIN users_readings on user_id = users.id
        WHERE reading_id = ?
        `, readingId)
      )
      
      return Promise.all(promises)
      .then(([bookData, usersData]) => {
        const readingsData = {
          book: bookData.rows,
          users: usersData.rows
        }
        return readingsData
      })
    }
  }
}