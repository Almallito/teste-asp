
exports.up = function(knex) {
    return knex.schema.createTable('favorites', (table) => {
      table.increments('id')
      table.integer('movie_id').notNullable()
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('favorites')
  };