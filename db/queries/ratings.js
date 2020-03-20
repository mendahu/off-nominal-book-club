const knex = require('../knex');

module.exports = {
  ratings : {

    add: (bookId, userId, rating) => {
      return knex('ratings')
        .returning('id')
        .insert({ 'book_id': bookId, 'user_id': userId, 'rating': rating })
    },

    update: (ratingId, rating) => {
      return knex('ratings')
        .where('id', ratingId)
        .update({ rating })
    }

  }
}