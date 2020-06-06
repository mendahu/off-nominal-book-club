exports.up = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.renameColumn('avatar_url', 'gravatar_avatar_url');
    table.string('patreon_avatar_url');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.renameColumn('gravatar_avatar_url', 'avatar_url');
    table.dropColumn('patreon_avatar_url');
  });
};
