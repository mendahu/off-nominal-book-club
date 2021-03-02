exports.up = function (knex) {
  return knex.schema.createTable("readings_milestones", function (table) {
    table.increments("id");
    table
      .integer("readings_id")
      .references("id")
      .inTable("readings")
      .notNullable()
      .onDelete("CASCADE");
    table.datetime("date").notNullable();
    table.string("label").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("readings_milestones");
};
