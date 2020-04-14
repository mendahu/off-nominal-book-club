import auth0 from '../../../lib/auth0';
import { ManagementClient } from 'auth0'

export default function update(req, res) {
  
  if (typeof window === 'undefined') {

    const auth0client = new ManagementClient({
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      scope: 'read:users read:user_idp_tokens'
    })

    let metaData;

    return auth0.getSession(req)
      .then(session => {
        const { user } = session;
        const params = { "id": user.sub }
        return auth0client.getUser(params)
      })
      .then(userData => {
        metaData = userData.app_metadata || null
        return res.end(JSON.stringify(metaData));
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