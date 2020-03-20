const knex = require('../knex');

module.exports = {
  tagRels : {

    add: (userId, tagId, bookId) => {
      return knex('user_tag_book')
        .returning('id')
        .insert({ 'user_id': userId, 'tag_id': tagId, 'book_id': bookId })
    },

    delete: (tagRelId) => {
      return knex('user_tag_book')
        .where('id', tagRelId)
        .del()
    }

  }
}