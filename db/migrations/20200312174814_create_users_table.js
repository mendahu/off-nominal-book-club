
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.time('created_at').defaultTo(knex.fn.now());
    table.time('updated_at').defaultTo(knex.fn.now());

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('todos').dropTable('users')
};
