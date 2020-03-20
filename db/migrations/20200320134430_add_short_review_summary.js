exports.up = function(knex) {
  return knex.schema.table('reviews', (table) => {
    table.string('summary').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.table('reviews', (table) => {
    table.dropColumn('summary');
  })
};
