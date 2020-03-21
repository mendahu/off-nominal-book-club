const queries = require('../../../db/queries/reviews')

export default (req, res) => {
  
  const { bookId, userId, summary, user_review } = req.body

  return queries
    .reviews
    .add(bookId, userId, summary, user_review)
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