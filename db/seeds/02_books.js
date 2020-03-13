
const data = require('../testdata_books.json') 
const books = data.items;
const processedBooks = books.map((book) => {
  const newBook = {
    user_id: (Math.round(Math.random()*10))+5,
    title: book.volumeInfo.title,
    fiction: false,
    image_url: book.volumeInfo.imageLinks.thumbnail
  }
  newBook.year = (book.volumeInfo.publishedDate) ? book.volumeInfo.publishedDate.slice(0, 4) : "Unknown";
  newBook.description = book.volumeInfo.description || "No Description Available"

  return newBook;
})

console.log(processedBooks)

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert(processedBooks);
    });
};
