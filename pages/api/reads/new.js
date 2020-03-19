const queries = require('../../../db/queries/reads')

export default (req, res) => {
  
  const { bookId, userId } = req.body

  queries
    .reads
    .add(bookId, userId)
    .then((results) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(results))
    })
    .catch(err => {
      console.error(err)
      res.statusCode = 500;
      res.end(JSON.stringify({"success": false}))
    })
};