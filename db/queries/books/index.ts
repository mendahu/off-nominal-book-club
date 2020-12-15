import { QueryResult } from 'pg';
import { ApiBook, ApiConfirmBookObj } from '../../../src/types/api/apiTypes';
import { BookData } from '../../../src/types/common';
import knex from '../../knex';

export const confirmBook = (bookObj: ApiConfirmBookObj) => {
  const lowerTitle = bookObj.title.toLowerCase();

  return knex
    .select<ApiConfirmBookObj>(
      'description',
      'fiction',
      'google_id',
      'id',
      'image_url as thumbnail',
      'title',
      knex.raw(
        `
        ( SELECT json_agg(authors) 
        FROM (
          SELECT name 
          FROM authors
            JOIN books_authors ON authors.id = books_authors.author_id
          WHERE books_authors.book_id = books.id
        ) authors ) AS authors`
      )
    )
    .from('books')
    .where('isbn13', bookObj.isbn13)
    .orWhere('google_id', bookObj.google_id)
    .orWhere(knex.raw('LOWER("title") LIKE ?', `%${lowerTitle}%`));
};

export const addBook = (bookObj) => {
  const promises = [];

  promises.push(
    knex
      .insert(bookObj.book)
      .returning('id')
      .into('books')
      .catch((err) => console.error(err))
  );

  const authorsArr = bookObj.authors.map((name) => {
    return { name };
  });

  promises.push(knex('authors').insert(authorsArr).returning('id'));

  return Promise.all(promises).then(([bookID, authorsIDs]) => {
    const bookAuthors = authorsIDs.map((id) => {
      return { author_id: Number(id), book_id: Number(bookID) };
    });

    return knex('books_authors')
      .insert(bookAuthors)
      .then(() => {
        return bookID;
      });
  });
};

export const fetchBook = (bookId: number, userId: number = 0) => {
  const params = {
    bookId,
    userId,
  };

  return knex
    .select<BookData[]>(
      'books.id',
      'books.title',
      'books.type',
      'books.google_id',
      'books.isbn10',
      'books.isbn13',
      'books.description',
      'books.year',
      'books.image_url as thumbnail',
      knex.raw(
        `(SELECT COUNT(reads.id) from reads where reads.book_id = books.id) as reads`
      ),
      knex.raw(
        `(SELECT count(favourites.id) from favourites where favourites.book_id = books.id) as favourites`
      ),
      knex.raw(
        `(SELECT count(wishlist.id) from wishlist where wishlist.book_id = books.id) as wishlist`
      ),
      knex.raw(
        `
      ( SELECT ROUND(AVG(rating), 1)
        FROM ratings
        WHERE ratings.book_id = ?
      ) as rating`,
        bookId
      ),
      knex.raw(
        `
      ( SELECT COUNT(id)
        FROM ratings
        WHERE ratings.book_id = ?
      ) as ratings`,
        bookId
      ),
      knex.raw(
        `
      ( SELECT json_agg(authors) 
      FROM (
        SELECT name 
        FROM authors
          JOIN books_authors ON authors.id = books_authors.author_id
        WHERE books_authors.book_id = ?
      ) authors ) AS authors`,
        bookId
      ),
      knex.raw(
        `
      ( SELECT json_agg(tag)
      FROM (
        SELECT tags.id as tag_id, name AS tag_name, COUNT('user_tag_book.id') as count 
        FROM tags
          JOIN user_tag_book ON tags.id = user_tag_book.tag_id
          JOIN books ON user_tag_book.book_id = books.id
        WHERE books.id = ?
        GROUP BY name, tags.id
        ORDER BY count DESC
      ) tag ) AS tags`,
        bookId
      ),
      knex.raw(
        `
      ( SELECT json_agg(review)
      FROM (
        SELECT reviews.id, reviews.user_id, users.name as name, CASE WHEN users.avatar_select='gravatar' THEN users.gravatar_avatar_url ELSE users.patreon_avatar_url END as avatar_url, ratings.rating, reviews.created_at as date, reviews.summary as summary, reviews.review as user_review
        FROM reviews
          JOIN users ON reviews.user_id = users.id
          LEFT JOIN ratings ON ratings.book_id = reviews.book_id AND ratings.user_id = reviews.user_id
        WHERE reviews.book_id = :bookId AND NOT reviews.user_id = :userId
        ORDER BY date DESC
      ) review ) AS reviews`,
        params
      )
    )
    .from('books')
    .where('books.id', bookId)
    .groupBy('books.id');
};

export const getAllBooks = () => {
  return knex.raw<QueryResult<ApiBook>>(
    `
      SELECT
        b.id,
        b.title,
        b.description,
        b.year,
        b.google_id,
        b.type,
        b.image_url as thumbnail,

        max(fav_count.count)::integer as favourites,
        max(read_count.count)::integer as reads,
        max(wishlist_count.count)::integer as wishlist,
        ROUND(max(ratings.avg_rating),1)::float as rating,
        
        ( SELECT string_agg(authors.name, ', ') 
          FROM (
            SELECT name 
            FROM authors
              JOIN books_authors ON authors.id = books_authors.author_id
            WHERE books_authors.book_id = b.id
          ) authors ) AS authors_string,

        ( SELECT json_agg(tags)
          FROM (
            SELECT 
              t.id,
              t.name as label,
              count(user_tag_book.id) as count
            FROM tags as t
              JOIN user_tag_book ON user_tag_book.tag_id = t.id
            WHERE user_tag_book.book_id = b.id
            GROUP BY t.id
            ORDER BY t.name
          ) as tags
        ) AS tags

      FROM books b
      
      LEFT JOIN (
        SELECT ratings.book_id, AVG(rating) as avg_rating
        FROM reviews
          RIGHT JOIN ratings ON ratings.book_id = reviews.book_id
        GROUP BY ratings.book_id) as ratings on ratings.book_id = b.id

      LEFT JOIN (
        SELECT book_id, count(*) as count
        FROM books
          JOIN favourites ON books.id = book_id
        GROUP BY book_id
      ) as fav_count ON fav_count.book_id = b.id

      LEFT JOIN (
        SELECT book_id, count(reads.book_id) as count
        FROM books
          JOIN reads ON books.id = reads.book_id
        GROUP BY book_id
      ) as read_count ON read_count.book_id = b.id

      LEFT JOIN (
        SELECT book_id, count(wishlist.book_id) as count
        FROM books
          JOIN wishlist ON books.id = wishlist.book_id
        GROUP BY book_id
      ) as wishlist_count ON wishlist_count.book_id = b.id

      GROUP BY b.id
    `
  );
};
