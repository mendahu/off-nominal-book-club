
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'Matthew', email: 'm.zj.chan@gmail.com', password: "Matthew", avatar_url: "https://gravatar.com/avatar/360be8daf96cd072088f5a68ca623980?s=400&d=robohash&r=x", bio: "a very nice boi", is_mod: true, is_owner: false, gets_mail: true},
        {name: 'Jake', email: 'test@test.com', password: "Jake", avatar_url: "https://gravatar.com/avatar/c7784140bc640ea275e74feaaad88da5?s=400&d=robohash&r=x", bio: "so handsome", is_mod: true, is_owner: true, gets_mail: true},
        {name: 'HoHo Hoang', email: 'hoho@hoang.com', password: "Hoang", avatar_url: "https://gravatar.com/avatar/5de33e6a2cd7e6e66f8d76be0d4cb480?s=400&d=robohash&r=x", bio: "likes fruit", is_mod: false, is_owner: false, gets_mail: false},
        {name: 'Lian', email: 'lian@lian.com', password: "Lian", avatar_url: "https://gravatar.com/avatar/1ac6b7cbd2a509d998dd6eda7d3098ab?s=400&d=robohash&r=x", bio: "friendly friend", is_mod: false, is_owner: false, gets_mail: true},
      ]);
    });
};
