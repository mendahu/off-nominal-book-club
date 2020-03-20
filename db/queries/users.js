const knex = require('../knex');

module.exports = {
  users : {

    fetch: (userId, bookId) => {
      return knex.select(
        "books.id",
        "rating",
        "review",
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
        .leftJoin('ratings', function() { 
          this
            .on('ratings.book_id', 'books.id')
            .on('ratings.user_id', userId)
        })
        .leftJoin('reviews', function() {
          this
            .on('reviews.book_id', 'books.id')
            .on('reviews.user_id', userId)
        } )
        .where('books.id', bookId)
    }

  }
}