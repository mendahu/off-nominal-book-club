const queries = require('../../../db/queries/readings')

export default (req, res) => {
  const { bookId, userId, dateStarted, dateEnded } = req.body
  
  return queries
  .readings
  .add(bookId, userId, dateStarted, dateEnded)
  .then((results) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify(results))
  })
  .catch(err => {
    console.error(err)
    res.statusCode = 500;
    return res.end(JSON.stringify({"success": false}))
  })
}