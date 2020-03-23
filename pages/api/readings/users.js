const queries = require('../../../db/queries/readings')

export default (req, res) => {
  const { readingId, userId } = req.body
  console.log(readingId, userId)
  return queries
  .users
  .addUser(readingId, userId)
  .then((results) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify(JSON.stringify(results)))
  })
  .catch(err => {
    console.error(err)
    res.statusCode = 500;
    return res.end(JSON.stringify({"success": false}))
  })
  
}