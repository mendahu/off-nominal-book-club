const queries = require('../../../db/queries/books')

export default (req, res) => {
  const bookObj = {
    user_id: 10,
    google_id: "d8Wl-dgSgK8C",
    isbn13: "1234567891234",
    title: "spACE",
    description: "A book about life, the universe, and everything",
    fiction: true,
    year: "1982",
    image_url: "https://i.ebayimg.com/images/g/48IAAOSwXcRZb5Sr/s-l300.jpg",
    name: "Douglas Adams"
  }

  queries
    .books
    .confirm(bookObj)
    .then((results) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(results))
    })
};