const queries = require('../../../db/queries/tagRels')
import auth0 from '../../../lib/auth0'
import userProfileFetcher from '../../../src/helpers/userProfileFetcher'

export default auth0.requireAuthentication(async (req, res) => {

  const userProfile = await userProfileFetcher(req)
  if (!userProfile.isPatron) return res.status(403).end(JSON.stringify({error: "not_authenticated", message: "Access restricted to logged in patrons only."}))
  
  const { userId, tag_id, bookId } = req.body

  return queries
    .tagRels
    .add(userId, tag_id, bookId)
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