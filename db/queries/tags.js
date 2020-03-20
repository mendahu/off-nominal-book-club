const knex = require('../knex');

module.exports = {
  tags : {

    add: (input) => {
      const tagName = input.toLowerCase()

      return knex.select('id')
        .from('tags')
        .where('name', tagName)
        .then((res) => 
          (res.length) 
            ? [res[0].id]
            : knex('tags').returning('id').insert({ 'name': tagName })
        )
        .catch(err => {
          console.error(err)
        })
    },
  }
}