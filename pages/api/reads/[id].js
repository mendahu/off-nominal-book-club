const queries = require('../../../db/queries/reads')

export default (req, res) => {
  const { query: { id }} = req
  
  return queries
    .reads
    .delete(id)
    .then(() => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json')
      res.statusMessage = `Read record ID ${id} successfully removed`
      return res.end(JSON.stringify({"success": true}))
    })
    .catch(err => {
      console.error(err)
      res.statusCode = 500;
      return res.end(JSON.stringify({"success": false}))
    })
};