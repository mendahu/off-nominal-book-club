exports.up = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.string('avatar_select').notNullable().defaultTo('gravatar');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('avatar_select');
  });
};
