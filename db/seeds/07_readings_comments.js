exports.seed = function(knex) {
  return knex('users_readings').select('reading_id', 'user_id')
  .then((results) => {
    const userComments = []
    const nouns = ["tortles", 'space', 'books', 'accounting', 'cake']

    results.forEach((comment) => {
      userComments.push({
        reading_id : comment.reading_id,
        user_id: comment.user_id,
        comment: `I like ${nouns[Math.floor(Math.random() * nouns.length)]}!`
      })
    })


    return userComments
  })
  .then((result) => {
    return knex('readings_comments').insert(result)
  })
}