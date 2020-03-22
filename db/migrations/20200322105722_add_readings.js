exports.up = function(knex) {
  return knex.schema.createTable('readings', function(table) {
    table.increments("id");
    table.integer("book_id").references('id').inTable('books').notNullable().onDelete('CASCADE');
    table.integer("user_id").references('id').inTable('users').notNullable().onDelete('CASCADE');
    table.datetime('date_started').notNullable()
    table.datetime('date_ended').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('readings');
};
