const knex = require('./knex');


module.exports = {
  users : {
    getAll: function() {
      return knex('users');
    }
  }
}