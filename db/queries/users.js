const knex = require('../knex');

module.exports = {
  users : {

    fetch: (userId, bookId) => {
      return knex.select(
        "books.id",
        "rating",
        "review",
        knex.raw(`ARRAY(SELECT name as tag_names
          FROM tags
            JOIN user_tag_book as tagrel ON tagrel.tag_id = tags.id
          WHERE tagrel.user_id = 1 AND tagrel.book_id = books.id
          ) as userTags`),
        knex.raw(`(SELECT CAST(COUNT(*) AS BIT) AS read
          FROM reads
          WHERE reads.user_id = 1 AND reads.book_id = books.id) as read`),
        knex.raw(`(SELECT CAST(COUNT(*) AS BIT) AS read
          FROM favourites
          WHERE favourites.user_id = 1 AND favourites.book_id = books.id) as fav`),
        knex.raw(`(SELECT CAST(COUNT(*) AS BIT) AS read
        FROM wishlist
        WHERE wishlist.user_id = 1 AND wishlist.book_id = books.id) as wishlist`)
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




/*

        
*/