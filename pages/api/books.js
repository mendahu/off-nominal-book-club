const queries = require('../../db/queries/books')

export default (req, res) => {
  return queries.books.getAll("").then((results) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify(results.rows))
  })
}

