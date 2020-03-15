
exports.up = function(knex) {
  return knex.schema.createTable('user_tag_book', function(table) {
    table.increments("id");
    table.integer("book_id").references('id').inTable('books').notNullable().onDelete('CASCADE');
    table.integer("user_id").references('id').inTable('users').notNullable().onDelete('CASCADE');
    table.integer("tag_id").references('id').inTable('tags').notNullable().onDelete('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user_tag_book');
};
