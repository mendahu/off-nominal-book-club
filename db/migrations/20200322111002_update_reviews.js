exports.up = function(knex) {
  return knex.schema.table('reviews', (table) => {
    table.integer("reading_id").references('id').inTable('readings').onDelete('SET NULL')
  })
};

exports.down = function(knex) {
  return knex.schema.table('reviews', (table) => {
    table.dropColumn('readding_id');
  })
};
