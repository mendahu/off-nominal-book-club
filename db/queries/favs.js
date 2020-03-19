const knex = require('../knex');

module.exports = {
  favourites : {

    add: (bookId, userId) => {
      return knex('favourites')
        .returning('id')
        .insert({ 'book_id': bookId, 'user_id': userId })
    },

    delete: (favId) => {
      return knex('favourites')
        .where('id', favId)
        .del()
    }

  }
}