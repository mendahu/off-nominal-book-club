import { ReadStream } from 'fs';
import knex from '../../knex';

export const getRandom = () => {
  return knex.raw(
    `
      SELECT
        'random' AS type, 
        id, 
        title, 
        description, 
        image_url as thumbnail, 
        year,
        ( SELECT json_agg(authors) 
          FROM (
            SELECT name 
            FROM authors
              JOIN books_authors ON authors.id = books_authors.author_id
            WHERE books_authors.book_id = books.id
          ) authors ) AS authors,
        ( SELECT row_to_json(userData)
          FROM (
            SELECT 
            ( SELECT count(reads.id) FROM reads WHERE reads.book_id = b.id) as reads,
            ( SELECT count(wishlist.id) FROM wishlist WHERE wishlist.book_id = b.id) as wishlist,
            ( SELECT count(favourites.id) FROM favourites WHERE favourites.book_id = b.id) as favourites,
            ( SELECT row_to_json(ratingData)
              FROM (
                SELECT
                  AVG(rating),
                  COUNT(id)
                FROM ratings
                WHERE ratings.book_id = books.id
            ) ratingData ) AS rating
          FROM books as b
          WHERE b.id = books.id
        ) userdata ) AS userdata
      FROM books
      ORDER BY RANDOM()
      LIMIT 1
    `
  );
};

export const getFavourite = () => {
  return knex.raw(
    `
      SELECT 
        'favourite' AS type, 
        books.id as id, 
        title, 
        description, 
        image_url as thumbnail,
        year,
        count(favourites.id) as favs, 
        ( SELECT json_agg(authors) 
          FROM (
            SELECT name 
            FROM authors
              JOIN books_authors ON authors.id = books_authors.author_id
            WHERE books_authors.book_id = books.id
          ) authors ) AS authors,
        ( SELECT row_to_json(userData)
          FROM (
            SELECT 
            (SELECT count(reads.id) FROM reads WHERE reads.book_id = b.id) as reads,
            (SELECT count(wishlist.id) FROM wishlist WHERE wishlist.book_id = b.id) as wishlist,
            (SELECT count(favourites.id) FROM favourites WHERE favourites.book_id = b.id) as favourites,
            ( SELECT row_to_json(ratingData)
            FROM (
              SELECT
                AVG(rating),
                COUNT(id)
              FROM ratings
              WHERE ratings.book_id = books.id
          ) ratingData ) AS rating 
          FROM books as b
          WHERE b.id = books.id
        ) userdata ) AS userdata
      FROM books
        JOIN favourites ON favourites.book_id = books.id
      WHERE favourites.created_at >= current_date - interval '30' day
      GROUP BY books.id
      ORDER BY favs
      LIMIT 1
    `
  );
};

export const getHighestRated = () => {
  return knex.raw(
    `
      SELECT 
        'highest_rated' AS type, 
        books.id as id, 
        title, 
        description, 
        image_url as thumbnail,
        year,
        AVG(ratings.rating) as rating, 
        ( SELECT json_agg(authors) 
          FROM (
            SELECT name 
            FROM authors
              JOIN books_authors ON authors.id = books_authors.author_id
            WHERE books_authors.book_id = books.id
          ) authors ) AS authors,
          ( SELECT row_to_json(userData)
          FROM (
            SELECT 
            (SELECT count(reads.id) FROM reads WHERE reads.book_id = b.id) as reads,
            (SELECT count(wishlist.id) FROM wishlist WHERE wishlist.book_id = b.id) as wishlist,
            (SELECT count(favourites.id) FROM favourites WHERE favourites.book_id = b.id) as favourites,
            ( SELECT row_to_json(ratingData)
            FROM (
              SELECT
                AVG(rating),
                COUNT(id)
              FROM ratings
              WHERE ratings.book_id = books.id
          ) ratingData ) AS rating 
          FROM books as b
          WHERE b.id = books.id
        ) userdata ) AS userdata
      FROM books
        JOIN ratings ON ratings.book_id = books.id
      WHERE ratings.created_at >= current_date - interval '60' day
      GROUP BY books.id
      ORDER BY rating
      LIMIT 1
    `
  );
};

export default {
  getRandom,
  getFavourite,
  getHighestRated,
};
