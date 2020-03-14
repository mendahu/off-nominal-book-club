
const data = require('../testdata_books.json') 
const books = data.items;

exports.seed = function(knex) {
  
  // Deletes ALL existing entries
  return knex('books').del()
    .then(() => {
      return knex.from('users').select('id')
    })
    .then((res) => {
      return books.map((book) => {
        const authorId = (Math.floor(Math.random() * res.length)) + res[0].id;
        const newBook = {
          user_id: authorId,
          title: book.volumeInfo.title,
          fiction: false,
          image_url: book.volumeInfo.imageLinks.thumbnail
        }
        newBook.year = (book.volumeInfo.publishedDate) ? book.volumeInfo.publishedDate.slice(0, 4) : "Unknown";
        newBook.description = book.volumeInfo.description || "No Description Available"
      
        return newBook;
      })
    })
    .then((results) => {
      // Inserts seed entries
      return knex('books').insert(results);
    });
};
