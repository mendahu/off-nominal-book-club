const queries = require('../../../db/queries/reads')

export default (req, res) => {
  const { query: { id }} = req
  
  queries
    .reads
    .delete(id)
    .then(() => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({"success": true}))
    })
    .catch(err => {
      console.error(err)
      res.statusCode = 500;
      res.end(JSON.stringify({"success": false}))
    })
};