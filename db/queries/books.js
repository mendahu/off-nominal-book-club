const knex = require('../knex');

module.exports = {
  books : {
    add: function(bookObj, authorObj) {

      const bookId = knex
        .insert(bookObj)
        .returning('id')
        .into('books');

      const authorId = knex
        .insert(authorObj)
        .returning('id')
        .into('authors');

      return Promise.all([bookId, authorId])
        .then((ids) => {
          return knex.insert({
            book_id: ids[0],
            author_id: ids[1]
          })
          .into('books_authors')
        })
    }
  }
}