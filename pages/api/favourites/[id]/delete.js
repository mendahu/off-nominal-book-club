const queries = require('../../../../db/queries/favs')
import auth0 from '../../../../lib/auth0'

export default auth0.requireAuthentication((req, res) => {
  
  const { query: { id }} = req
  
  return queries
    .favourites
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
});