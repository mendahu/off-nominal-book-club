
exports.up = function(knex) {
  return knex.schema.alterTable('tags', (table) => {
    table.unique('name')
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('tags', (table) => {
    table.dropUnique('name')
  })
};
