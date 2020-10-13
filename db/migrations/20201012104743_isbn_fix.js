const axios = require('axios')
const newIsbns = require('../migration_scripts/newIsbnData.json')

exports.up = function(knex) {
  return knex.schema.alterTable('books', (table) => {
    table.string('isbn13').alter().nullable();
    table.string('isbn10');
  })
  .then(() => {
    knex.from('books').select('id', 'google_id').orderBy('id')
    .then((onbcres) => {

      const promises = []

      for (let i = 0; i < onbcres.length; i++) {
        const currentBook = onbcres[i]
        const currentOnbcId = currentBook.id
        const newData = newIsbns[onbcres[i].id]

        const newIsbn13 = newData.isbn13 || null
        const newIsbn10 = newData.isbn10 || null

        const update = knex.from('books').where('id', currentOnbcId)
          .update('isbn13', newIsbn13)
          .update('isbn10', newIsbn10)
          .returning('id')

        promises.push(update)
      }

      Promise.all(promises)
        .then((responses) => {
        })
    })
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('books', (table) => {
    table.string('isbn13').alter().notNullable();
    table.dropColumn('isbn10');
  });
};
