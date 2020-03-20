const queries = require('../../../db/queries/books')

export default (req, res) => {
  
  const term = req.query.term

  queries.books.getTags(term).then((results) => {
    res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(results.rows))
  })
}

