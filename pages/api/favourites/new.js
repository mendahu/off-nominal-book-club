const queries = require('../../../db/queries/favs')
import auth0 from '../../../lib/auth0'

export default auth0.requireAuthentication((req, res) => {
  
  const { bookId, userId } = req.body

  return queries
    .favourites
    .add(bookId, userId)
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
});