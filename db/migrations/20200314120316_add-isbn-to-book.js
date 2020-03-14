
exports.up = function(knex) {
  return knex.schema.table('books', (table) => {
    table.string('isbn13').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.table('books', (table) => {
    table.dropColumn('isbn13');
  })
};
