const queries = require('../../../db/queries/ratings')

export default (req, res) => {

  const { query: { id }} = req
  const { rating } = req.body
  
  return queries
    .ratings
    .update(id, rating)
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