// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'site_asp',
      user:     'postgres',
      password: '123456'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'site_asp',
      user:     'postgres',
      password: '123456'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'site_asp',
      user:     'postgres',
      password: '123456'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
