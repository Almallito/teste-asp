
exports.up = function(knex) {
    return knex.schema.createTable('observations', (table) => {
      table.increments('id')
      table.text('observation').notNullable()
      table.integer('favorite_id').references('id').inTable('favorites')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('observations')
  };