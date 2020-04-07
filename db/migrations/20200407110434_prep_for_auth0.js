
exports.up = function(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.string('name').nullable().defaultTo("An Anonymous Anomaly").alter();
    table.dropColumn('email')
    table.dropColumn('password')
    table.string('bio').defaultTo("This bio is protected by ITAR, probably.").alter();
    table.dropColumn('is_mod');
    table.dropColumn('is_owner');
    table.boolean('gets_mail').defaultTo(false).alter();
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.string('name').notNullable().alter();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('bio').alter();
    table.boolean('is_mod').notNullable();
    table.boolean('is_owner').notNullable();
    table.boolean('gets_mail').alter();
  })
};
