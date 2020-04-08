import auth0 from '../../../lib/auth0';
import { ManagementClient } from 'auth0'

export default function update(req, res) {
  
  if (typeof window === 'undefined') {
    const { userId } = req.body;

    const auth0client = new ManagementClient({
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      scope: 'update:users update:users_app_metadata'
    })

    return auth0.getSession(req)
      .then(session => {
        const { user } = session;
        const params = { "id": user.sub }
        const data = { "app_metadata": { "onbc_id": userId } }

        return auth0client.updateUser(params, data)
      })
      .then(userObj => {
        res.status(userObj.app_metadata.onbc_id === userId ? 200 : 400)
        return res.end()
      })
      .catch(err => {
        console.error(err)
        const { name, statusCode, message } = err
        res.status(statusCode)
        return res.end(JSON.stringify({ name, statusCode, description: JSON.parse(message).error_description }))
      })
  }

  return;

};
