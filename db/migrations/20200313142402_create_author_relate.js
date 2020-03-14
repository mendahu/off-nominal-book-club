
exports.up = function(knex) {
  return knex.schema.createTable('books_authors', function(table) {
    table.increments("id");
    table.integer("book_id").references('id').inTable('books').notNullable().onDelete('CASCADE');
    table.integer("author_id").references('id').inTable('authors').notNullable().onDelete('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('books_authors');
};
