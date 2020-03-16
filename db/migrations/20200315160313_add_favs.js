
exports.up = function(knex) {
  return knex.schema.createTable('favourites', function(table) {
    table.increments("id");
    table.integer("book_id").references('id').inTable('books').notNullable().onDelete('CASCADE');
    table.integer("user_id").references('id').inTable('users').notNullable().onDelete('CASCADE');
    table.datetime('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('favourites');
};
