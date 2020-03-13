
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'Matthew', email: 'm.zj.chan@gmail.com'},
        {id: 2, name: 'Jake', email: 'jake@jake.com'},
        {id: 3, name: 'HoHo', email: 'hohohoang@gmail.com'}
      ]);
    });
};
