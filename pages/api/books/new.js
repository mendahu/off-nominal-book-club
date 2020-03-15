const queries = require('../../../db/queries/books')

export default (req, res) => {

  console.log(req.query)

  const bookObj = {
    google_id: req.query.googleid,
    isbn13: req.query.isbn13,
    title: req.query.title,
  }

  console.log(bookObj)

  queries
    .books
    .confirm(bookObj)
    .then((results) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(results))
    })
};