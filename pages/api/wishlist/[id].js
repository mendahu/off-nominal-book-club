const queries = require('../../../db/queries/wishlist')

export default (req, res) => {
  const { query: { id }} = req
  
  return queries
    .wishlist
    .delete(id)
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