
exports.up = function(knex) {
  return knex.schema.alterTable('books', (table) => {
    table.string('type').notNullable().defaultTo('Non-Fiction');
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('books', (table) => {
    table.dropColumn('type');
  })
};
