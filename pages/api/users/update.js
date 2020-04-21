import auth0 from '../../../lib/auth0'
import { users } from '../../../db/queries/users'
import { getAuth0User } from '../../../src/helpers/auth0/auth0User';

export default auth0.requireAuthentication(async function update(req, res) {
  
  const { name, bio } = req.body
  
  const { user: { sub } } = await auth0.getSession(req)
  const { app_metadata: { onbc_id }} = await getAuth0User(sub)

  return users
    .update(onbc_id, { bio, name })
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