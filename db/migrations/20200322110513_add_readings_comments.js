exports.up = function(knex) {
  return knex.schema.createTable('readings_comments', function(table) {
    table.increments("id");
    table.integer("reading_id").references('id').inTable('readings').notNullable().onDelete('CASCADE');
    table.integer("user_id").references('id').inTable('users').notNullable().onDelete('CASCADE');
    table.integer("review_id").references('id').inTable('reviews').notNullable().onDelete('CASCADE');
    table.datetime('created_at').defaultTo(knex.fn.now())
    table.text('comment').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('readings_comments');
};
