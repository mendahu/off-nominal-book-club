const queries = require('../../../db/queries/books')

export default (req, res) => {
  
  const {
    query: { tag }
  } = req

  // res.end(`GET: ${tag}`)
  return queries.books.selectTag(tag).then((results) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify(results.rows))
  })
}

