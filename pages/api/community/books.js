const queries = require('../../../db/queries/books')

export default (req, res) => {
  
  const term = req.query.term

  return queries.books.getAll(term).then((results) => {
    res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json')
      return res.end(JSON.stringify(results.rows))
  })
}

