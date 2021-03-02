exports.up = function (knex) {
  return knex.schema.alterTable("readings", (table) => {
    table.dropColumn("date_started");
    table.dropColumn("date_ended");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("readings", (table) => {
    table.datetime("date_started").notNullable();
    table.datetime("date_ended").notNullable();
  });
};
