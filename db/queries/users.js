const knex = require('../knex');

module.exports = {
  users : {

    fetch: (userId, bookId) => {
      return knex.select(
        "books.id",
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
              SELECT reviews.id as id, reviews.summary as summary, reviews.review as user_review
              FROM reviews
              WHERE reviews.user_id = ? AND reviews.book_id = books.id
            ) review ) as review`, userId),
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
    }

  }
}