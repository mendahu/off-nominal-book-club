
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
        {name: 'Nick', email: 'nick@nick.com', password: "Nick", avatar_url: "https://gravatar.com/avatar/864d26c31855c8b04f37aac3f53dac08?s=400&d=robohash&r=x", bio: "knees weak, arms are heavy", is_mod: false, is_owner: false, gets_mail: true},
        {name: 'Elissa', email: 'elissa@elissa.com', password: "Elissa", avatar_url: "https://gravatar.com/avatar/6e1b0a28eb71331df4194a6aba24d680?s=400&d=robohash&r=x", bio: "best midterm partner ever", is_mod: false, is_owner: false, gets_mail: true},
        {name: 'Clare', email: 'clare@clare.com', password: "Clare", avatar_url: "https://gravatar.com/avatar/e61e1f31febf9f58ff798e1157a75133?s=400&d=robohash&r=x", bio: "cruelty free, dank af", is_mod: false, is_owner: false, gets_mail: true},
        {name: 'Olivia', email: 'olivia@olviia.com', password: "Olivia", avatar_url: "https://gravatar.com/avatar/afd66c2123c7023e02e4fd50bee2e56b?s=400&d=robohash&r=x", bio: "you better believe I'm OP", is_mod: false, is_owner: false, gets_mail: false},
        {name: 'Eina', email: 'eina@eina.com', password: "Eina", avatar_url: "https://gravatar.com/avatar/c46c24eaa5632432682d7fa2b880c374?s=400&d=robohash&r=x", bio: "keep the cheese away from me", is_mod: false, is_owner: false, gets_mail: true},
        {name: 'Ladan', email: 'ladan@ladan.com', password: "Ladan", avatar_url: "https://gravatar.com/avatar/7b415485b8c38888d9ca9ca78129cef5?s=400&d=robohash&r=x", bio: "G-O-PHYSICAL", is_mod: false, is_owner: false, gets_mail: true},
        {name: 'Luke', email: 'luke@luke.com', password: "Luke", avatar_url: "https://gravatar.com/avatar/8fec59f55fcfcfea053e9527478c3c55?s=400&d=robohash&r=x", bio: "the newest friend", is_mod: false, is_owner: false, gets_mail: false},
      ]);
    });
};
