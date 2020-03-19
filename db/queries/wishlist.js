const knex = require('../knex');

module.exports = {
  wishlist : {

    add: (bookId, userId) => {
      return knex('wishlist')
        .returning('id')
        .insert({ 'book_id': bookId, 'user_id': userId })
    },

    delete: (wishId) => {
      return knex('wishlist')
        .where('id', wishId)
        .del()
    }

  }
}