const queries = require('../../../db/queries/ratings')

export default (req, res) => {
  
  const { bookId, userId, rating } = req.body

  return queries
    .ratings
    .add(bookId, userId, rating)
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
};