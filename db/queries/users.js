const knex = require('../knex');

module.exports = {
  users : {

    authenticate: (email, password) => {
      return knex.select("password").table('users').where("email", email)
        .then((pass) => {
          return (pass[0].password === password)
        })
        .catch((err) => {
          throw error
        })
    },

  }
}