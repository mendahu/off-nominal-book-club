const queries = require('../../../db/queries/reads')

export default (req, res) => {
  
  const { bookId, userId } = req.body

  return queries
    .reads
    .add(bookId, userId)
    .then((results) => {
      console.log("returned read id", results)
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json')
      return res.end(JSON.stringify(results))
    })
    .catch(err => {
      console.error(err)
      res.statusCode = 500;
      return res.end(JSON.stringify({"success": false}))
    })
};