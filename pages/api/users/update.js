import auth0 from '../../../lib/auth0';
import { ManagementClient } from 'auth0'

export default function update(req, res) {
  
  const { userId } = req.body;

  const auth0client = new ManagementClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    scope: 'update:users update:users_app_metadata'
  })

  
  if (typeof window === 'undefined') {
     return auth0.getSession(req)
      .then(session => {
        const { user } = session;
        return user.sub;
      })
      .then(auth0sub => {

        const params = { "id": auth0sub }
        const data = { "app_metadata": { "onbc_id": userId } }

        return auth0client.updateUser(params, data)
      })
      .catch(err => console.error(err))
  }

  return;

};
