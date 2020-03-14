const data = require('../testdata_books.json') 
const books = data.items;

exports.seed = function(knex) {

  //clear table if items exist
  const delList = knex('books_authors').del()

  //Fetch books and author ids from db
  const bookList = knex.from('books').select('id')
  const authorList = knex.from('authors').select('id')

  //once you have acess to books and authors, kick off populating
  return Promise.all([bookList, authorList, delList])
    .then((results) => {
      
      //empty container to hold relationships for the db
      const relationships = [];

      //Need this to figure out how to generate a random author ID
      //Seed data just randomly assigns authors
      authorCount = results[1].length

      //loop through each book in the db
      results[0].forEach((book) => {

        //generate a random author ID
        authorId = Math.floor(Math.random() * results[1].length) + results[1][0].id;

        //push a new relationship object into the container
        relationships.push({
          book_id: book.id,
          author_id: authorId
        })

        //~10% of books will have a second author
        if (Math.random() < 0.1) {
          relationships.push({
            book_id: book.id,
            author_id: authorId + 1
          })
        }
      })

      //container now full and ready to be inserted into db
      return relationships;
    })
    .then((result) => {
      //insert the items in the table
      return knex('books_authors').insert(result);
    })
};
