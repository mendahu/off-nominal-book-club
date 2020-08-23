require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DEV_DB_HOST,
      user: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASS,
      database: process.env.DEV_DB_NAME,
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
  },

  staging: {
    client: 'pg',
    connection: {
      host: process.env.STAGING_DB_HOST,
      user: process.env.STAGING_DB_USER,
      password: process.env.STAGING_DB_PASS,
      database: process.env.STAGING_DB_NAME,
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
  },
};
