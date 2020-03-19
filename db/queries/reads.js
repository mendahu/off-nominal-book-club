const knex = require('../knex');

module.exports = {
  reads : {

    add: (bookId, userId) => {
      return knex('reads')
        .returning('id')
        .insert({ 'book_id': bookId, 'user_id': userId })
    },

    delete: (readId) => {
      return knex('reads')
        .where('id', readId)
        .del()
    }

  }
}