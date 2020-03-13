
exports.up = function(knex) {
  return knex.schema.table('users', (table) => {
    table.string('password').notNullable();
    table.string('avatar_url');
    table.string('bio');
    table.boolean('is_mod').notNullable();
    table.boolean('is_owner').notNullable();
    table.boolean('gets_mail').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('password');
    table.dropColumn('avatar_url');
    table.dropColumn('bio');
    table.dropColumn('is_mod');
    table.dropColumn('is_owner');
    table.dropColumn('gets_mail');
  })
};
