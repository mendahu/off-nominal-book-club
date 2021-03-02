exports.up = function (knex) {
  return knex.schema.alterTable("users_readings", (table) => {
    table.dropColumn("gets_mail");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("users_readings", (table) => {
    table.boolean("gets_mail").notNullable().defaultTo(true);
  });
};
