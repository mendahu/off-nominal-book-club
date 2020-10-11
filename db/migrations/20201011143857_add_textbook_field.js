
exports.up = function(knex) {
  return knex.schema.alterTable('books', (table) => {
    table.boolean('textbook').notNullable().defaultTo(false);
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('books', (table) => {
    table.dropColumn('textbook');
  })
};
