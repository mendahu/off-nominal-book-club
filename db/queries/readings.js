const knex = require('../knex')

module.exports = {
  readings: {
    fetch: (readingId) => {
      const promises = [];
      
      promises.push(
        knex.raw(`
          SELECT b.id, b.title, authors, b.year, b.image_url, date_started, date_ended
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

      promises.push(
        knex.raw(`
          SELECT users.id as user_id, users.name, users.avatar_url, comment, readings_comments.created_at
          FROM users
          JOIN readings_comments on user_id = users.id
          WHERE reading_id = ?
          ORDER BY readings_comments.created_at DESC
        `, readingId)
      )
      
      return Promise.all(promises)
      .then(([bookData, usersData, comments]) => {
        const readingsData = {
          book: {
            id: bookData.rows[0].id,
            title: bookData.rows[0].title,
            authors: bookData.rows[0].authors,
            year: bookData.rows[0].year,
            image_url: bookData.rows[0].image_url,
            date_started: JSON.stringify(bookData.rows[0].date_started),
            date_ended: JSON.stringify(bookData.rows[0].date_ended),
          }, 
          users: usersData.rows,
          comments: comments.rows.map(comment => {
            return {
              id: comment.user_id,
              name: comment.name,
              avatar_url: comment.avatar_url,
              comment: comment.comment,
              created_at: JSON.stringify(comment.created_at)
            }
          })
        }
        return readingsData
      })
    }
  },
  users: {
    addUser: (readingId, userId) => {
      return knex('users_readings')
      .then({'reading_id': readingId, 'user_id': userId, 'gets_mail': true})
    }
  }
}

