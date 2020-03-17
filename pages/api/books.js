const queries = require('../../db/queries/books')

export default (req, res) => {
  queries.books.getAll().then((results) => {
    res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(results))
  })
}

