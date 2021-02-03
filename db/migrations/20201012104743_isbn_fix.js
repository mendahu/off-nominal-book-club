exports.up = function (knex) {
  return knex.schema.alterTable("books", (table) => {
    table.string("isbn13").alter().nullable();
    table.string("isbn10");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("books", (table) => {
    table.string("isbn13").alter().notNullable();
    table.dropColumn("isbn10");
  });
};
