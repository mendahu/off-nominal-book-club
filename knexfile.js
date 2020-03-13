module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'bookman',
      password : 'bookman',
      database : 'final'
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  }
};