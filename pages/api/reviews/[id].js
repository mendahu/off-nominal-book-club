const queries = require('../../../db/queries/reviews')

export default (req, res) => {

  const { query: { id }} = req
  const { summary, user_review } = req.body
  
  return queries
    .reviews
    .update(id, summary, user_review)
    .then(() => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json')
      return res.end(JSON.stringify({"success": true}))
    })
    .catch(err => {
      console.error(err)
      res.statusCode = 500;
      return res.end(JSON.stringify({"success": false}))
    })
};