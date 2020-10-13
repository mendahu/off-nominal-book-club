const knex = require('../knex');

module.exports = {
  users: {
    //only called by Auth0 when user registers to get an onbc_id and send to Auth0
    register: () => {
      return knex('users').returning('id').insert({});
    },

    //called by user when they update their onbc profile
    update: (userId, fieldsToUpdate) => {
      return knex('users').where('id', '=', userId).update(fieldsToUpdate);
    },

    fetch: (userId, bookId) => {
      const params = {
        bookId,
        userId,
      };

      return knex
        .select(
          knex.raw(
            `
        ( SELECT users.name
          FROM users
          WHERE users.id = :userId) as name`,
            params
          ),
          knex.raw(
            `
        ( SELECT json_agg(rating)
          FROM (
            SELECT ratings.id as id, ratings.rating as user_rating
            FROM ratings
            WHERE ratings.user_id = ? AND ratings.book_id = books.id
          ) rating ) as rating`,
            userId
          ),
          knex.raw(
            `
          ( SELECT json_agg(review)
            FROM (
              SELECT reviews.id as id, reviews.user_id, users.name as name, CASE WHEN users.avatar_select='gravatar' THEN users.gravatar_avatar_url ELSE users.patreon_avatar_url END as avatar_url, reviews.created_at as date, reviews.summary as summary, reviews.review as user_review
              FROM reviews
                JOIN users ON users.id = reviews.user_id
              WHERE reviews.user_id = :userId AND reviews.book_id = books.id
            ) review ) as review`,
            params
          ),
          knex.raw(
            `
        ( SELECT json_agg(tags) 
          FROM (
            SELECT tags.id as tag_id,tagrel.id as tag_rel_id, tags.name
            FROM tags
              JOIN user_tag_book as tagrel ON tagrel.tag_id = tags.id
            WHERE tagrel.user_id = ? AND tagrel.book_id = books.id
          ) tags ) as user_tags`,
            userId
          ),
          knex.raw(
            `
          (SELECT reads.id
            FROM reads
            WHERE reads.user_id = ? AND reads.book_id = books.id) as read`,
            userId
          ),
          knex.raw(
            `
          (SELECT favourites.id
            FROM favourites
            WHERE favourites.user_id = ? AND favourites.book_id = books.id) as fav`,
            userId
          ),
          knex.raw(
            `
          (SELECT wishlist.id
            FROM wishlist
            WHERE wishlist.user_id = ? AND wishlist.book_id = books.id) as wishlist`,
            userId
          )
        )
        .from('books')
        .where('books.id', bookId);
    },

    getUserData: (userId) => {
      const promises = [];

      promises.push(
        knex.raw(
          `
        SELECT name, bio, gravatar_avatar_url, patreon_avatar_url, avatar_select, gets_mail
          FROM users
          WHERE id = ?
        `,
          userId
        )
      );

      promises.push(
        knex.raw(
          `
          SELECT 
          b.id,
          b.title,
          b.image_url,
          ( SELECT json_agg(authors) 
              FROM (
                SELECT name 
                FROM authors
                  JOIN books_authors ON authors.id = books_authors.author_id
                WHERE books_authors.book_id = b.id
              ) authors ) AS authors
        FROM books b
          JOIN favourites r on r.book_id = b.id
        WHERE r.user_id = ?
        GROUP BY b.id
        `,
          userId
        )
      );

      promises.push(
        knex.raw(
          `
        SELECT 
          b.id,
          b.title,
          b.image_url,
          ( SELECT json_agg(authors) 
              FROM (
                SELECT name 
                FROM authors
                  JOIN books_authors ON authors.id = books_authors.author_id
                WHERE books_authors.book_id = b.id
              ) authors ) AS authors
        FROM books b
          JOIN reads r on r.book_id = b.id
        WHERE r.user_id = ?
        GROUP BY b.id
        `,
          userId
        )
      );

      promises.push(
        knex.raw(
          `
          SELECT 
          b.id,
          b.title,
          b.image_url,
          ( SELECT json_agg(authors) 
              FROM (
                SELECT name 
                FROM authors
                  JOIN books_authors ON authors.id = books_authors.author_id
                WHERE books_authors.book_id = b.id
              ) authors ) AS authors
        FROM books b
          JOIN wishlist r on r.book_id = b.id
        WHERE r.user_id = ?
        GROUP BY b.id
        `,
          userId
        )
      );

      promises.push(
        knex.raw(
          `
        SELECT b.id, b.title, b.image_url, rating,
        ( SELECT json_agg(authors) 
        FROM (
          SELECT name 
          FROM authors
            JOIN books_authors ON authors.id = books_authors.author_id
          WHERE books_authors.book_id = b.id
        ) authors ) AS authors
        FROM books b
          JOIN ratings on ratings.book_id = b.id
        WHERE ratings.user_id = ?
        GROUP BY b.id, ratings.rating
        `,
          userId
        )
      );

      return Promise.all(promises)
        .then(([userData, favsData, readsData, wishlistData, ratingsData]) => {
          if (!userData.rows.length) {
            throw 'User not found';
          }

          const {
            name,
            bio,
            gravatar_avatar_url,
            patreon_avatar_url,
            avatar_select,
            gets_mail,
          } = userData.rows[0];

          const onbcData = {
            name,
            bio,
            gravatar_avatar_url,
            patreon_avatar_url,
            avatar_select,
            favourites: favsData.rows,
            reads: readsData.rows,
            wishlist: wishlistData.rows,
            ratings: ratingsData.rows,
            getsMail: gets_mail,
          };
          return onbcData;
        })
        .catch((err) => {
          throw err;
        });
    },
  },
};
