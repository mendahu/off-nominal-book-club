exports.up = function (knex) {
  return knex.schema.alterTable("readings", (table) => {
    table.text("description");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("readings", (table) => {
    table.dropColumn("textbook");
  });
};
