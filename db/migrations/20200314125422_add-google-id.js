
exports.up = function(knex) {
  return knex.schema.table('books', (table) => {
    table.string('google_id').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.table('books', (table) => {
    table.dropColumn('google_ids');
  })
};
