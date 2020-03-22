exports.up = function(knex) {
  return knex.schema.createTable('users_readings', function(table) {
    table.increments("id");
    table.integer("reading_id").references('id').inTable('readings').notNullable().onDelete('CASCADE');
    table.integer("user_id").references('id').inTable('users').notNullable().onDelete('CASCADE');
    table.boolean("gets_mail").notNullable().defaultTo(true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users_readings');
};
