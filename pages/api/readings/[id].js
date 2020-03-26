const queries = require('../../../db/queries/readings')

export default (req, res) => {
  const {
    query: {id}
  } = req


  return queries.readings.fetch(id).then((results) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify(results))
  })
}