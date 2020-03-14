
exports.up = function(knex) {
  return knex.schema.createTable('books', function(table) {
    table.increments("id");
    table.integer("user_id").references('id').inTable('users').notNullable().onDelete('SET NULL');
    table.datetime("created_at").defaultTo(knex.fn.now());
    table.datetime("updated_at").defaultTo(knex.fn.now());
    table.string("title").notNullable();
    table.boolean("fiction").notNullable();
    table.string("year").notNullable();
    table.text("description").notNullable();
    table.string("image_url").notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('books');
};
