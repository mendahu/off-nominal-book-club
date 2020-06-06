const knex = require('../knex');

module.exports = {
  readings: {
    fetch: (readingId) => {
      const promises = [];

      promises.push(
        knex.raw(
          `
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
            `,
          readingId
        )
      );

      promises.push(
        knex.raw(
          `
        SELECT users.id, users.name, users.avatar_select, users.gravatar_avatar_url, users.patreon_avatar_url
        FROM users
        JOIN users_readings on user_id = users.id
        WHERE reading_id = ?
        `,
          readingId
        )
      );

      promises.push(
        knex.raw(
          `
          SELECT users.id as user_id, users.name, users.avatar_select, users.gravatar_avatar_url, users.patreon_avatar_url, comment, readings_comments.created_at
          FROM users
          JOIN readings_comments on user_id = users.id
          WHERE reading_id = ?
          ORDER BY readings_comments.created_at DESC
        `,
          readingId
        )
      );

      return Promise.all(promises).then(([bookData, usersData, comments]) => {
        const readingsData = {
          book: {
            id: bookData.rows[0]?.id || null,
            title: bookData.rows[0]?.title || null,
            authors: bookData.rows[0]?.authors || null,
            year: bookData.rows[0]?.year || null,
            image_url: bookData.rows[0]?.image_url || null,
            date_started: JSON.stringify(
              bookData.rows[0]?.date_started || null
            ),
            date_ended: JSON.stringify(bookData.rows[0]?.date_ended || null),
          },
          users: usersData.rows,
          comments: comments.rows.map((comment) => {
            return {
              id: comment.user_id,
              name: comment.name,
              avatar_url:
                comment.avatar_select === 'gravatar'
                  ? comment.gravatar_avatar_url
                  : comment.patreon_avatar_url,
              comment: comment.comment,
              created_at: JSON.stringify(comment.created_at),
            };
          }),
        };
        return readingsData;
      });
    },
    getUsersReadings: (userId) => {
      const promises = [];

      promises.push(
        knex.raw(
          `
        SELECT readings.id, max(books.title) as title, max(books.image_url) as image_url, max(readings.user_count) as user_count
        FROM books
          JOIN (
          SELECT readings.id as id, readings.book_id as book_id, COUNT(*) as user_count
          FROM readings
            JOIN users_readings on readings.id = users_readings.reading_id
          GROUP BY readings.id) as readings on readings.book_id = books.id
          JOIN (
          SELECT reading_id, array_agg(user_id) as users_array
          from users_readings
          GROUP BY reading_id
        ) as users on readings.id = users.reading_id
        WHERE (? = ANY(users.users_array)
        )
        GROUP BY readings.id
        `,
          userId
        )
      );

      promises.push(
        knex.raw(
          `
        SELECT readings.id, max(books.title) as title, max(books.image_url) as image_url, max(readings.user_count) as user_count
        FROM books
          JOIN (
          SELECT readings.id as id, readings.book_id as book_id, COUNT(*) as user_count
          FROM readings
            JOIN users_readings on readings.id = users_readings.reading_id
          GROUP BY readings.id) as readings on readings.book_id = books.id
          JOIN (
          SELECT reading_id, array_agg(user_id) as users_array
          from users_readings
          GROUP BY reading_id
        ) as users on readings.id = users.reading_id
        WHERE NOT (? = ANY(users.users_array)
        )
        GROUP BY readings.id
        `,
          userId
        )
      );
      return Promise.all(promises).then(([joined, notJoined]) => {
        const readings = {
          joined: joined.rows,
          notJoined: notJoined.rows,
        };
        return readings;
      });
    },
    getBookData: (bookId) => {
      return knex.raw(
        `
      SELECT books.id, books.title, authors, books.year, books.image_url
      FROM books 
      LEFT JOIN (
        SELECT book_id, json_agg(name) AS authors
        FROM authors a
        JOIN books_authors ba ON a.id = ba.author_id
        GROUP BY book_id
        ) AS author_names ON author_names.book_id = books.id
        WHERE books.id = ?;
      `,
        bookId
      );
    },
    add: (bookId, userId, dateStarted, dateEnded) => {
      return knex('readings')
        .returning('id')
        .insert({
          book_id: bookId,
          user_id: userId,
          date_started: dateStarted,
          date_ended: dateEnded,
        });
    },
  },
  users: {
    addUser: (readingId, userId) => {
      return knex('users_readings').insert({
        reading_id: readingId,
        user_id: userId,
        gets_mail: true,
      });
    },
    deleteUser: (readingId, userId) => {
      return knex('users_readings')
        .where({ reading_id: readingId, user_id: userId })
        .del();
    },
  },
};
