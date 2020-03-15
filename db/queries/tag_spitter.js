const knex = require('../knex');

module.exports = {
  books : {

    getAll: () => {
      return knex.select().table('books')
    },

  }
}