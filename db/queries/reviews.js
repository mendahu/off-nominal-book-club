const knex = require('../knex');

module.exports = {
  reviews : {

    add: (bookId, userId, summary, user_review) => {
      return knex('reviews')
        .returning(['id', 'created_at'])
        .insert({ 'book_id': bookId, 'user_id': userId, 'summary': summary, "review": user_review })
    },

    update: (reviewId, summary, user_review) => {
      return knex('reviews')
        .where('id', reviewId)
        .update({ summary, review: user_review })
    }

  }
}