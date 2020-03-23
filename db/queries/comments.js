const knex = require('../knex')
import queries from "./readings"

module.exports = {
  comments : {
    add : (readingId, userId, comment) => {
      return knex('readings_comments')
        .insert({'reading_id': readingId, 'user_id': userId, 'comment': comment})
    }

  }
}