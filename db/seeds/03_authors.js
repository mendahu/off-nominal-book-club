const data = require('../testdata_books.json') 
const books = data.items;
const authors = books.map((book) => [book.volumeInfo.authors])

//console.log(authors)

const flattenedAuthors = authors.flat(Infinity).map((author) => {
  return { name: author || "No author" };
});

console.log(flattenedAuthors);

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('authors').del()
    .then(function () {
      // Inserts seed entries
      return knex('authors').insert(flattenedAuthors);
    });
};
