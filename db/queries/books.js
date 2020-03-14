const knex = require('../knex');

module.exports = {
  books : {

    confirm: function(bookObj) {
      const lowerTitle = bookObj.title.toLowerCase();

      return knex.select().from('books')
        .where("isbn13", bookObj.isbn13)
        .orWhere("google_id", bookObj.google_id)
        .orWhere(knex.raw('LOWER("title") LIKE ?', `%${lowerTitle}%`))
    },

    add: function(bookObj) {

      const bookId = knex
        .insert(bookObj.book)
        .returning('id')
        .into('books');

      const authorId = knex
        .insert(bookObj.author)
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