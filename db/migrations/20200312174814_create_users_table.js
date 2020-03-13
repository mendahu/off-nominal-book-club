
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments("id");
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.datetime('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
