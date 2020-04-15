import auth0 from '../../../lib/auth0';
import { ManagementClient } from 'auth0'
import patreonProfileFetcher from '../../../src/helpers/patreon/profileFetcher'
import userDataFormatter from '../../../src/helpers/userDataFormatter'

export default function me(req, res) {
  
  if (typeof window === 'undefined') {

    const auth0client = new ManagementClient({
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      scope: 'read:users read:user_idp_tokens'
    })

    let userData;

    return auth0.getSession(req)
      .then(session => {
        if (!session) return null
        const { user: { sub } } = session;
        const params = { "id": sub }
        return auth0client.getUser(params)
      })
      .then(authData => {
        userData = userDataFormatter(authData)
        const patreonToken = authData.app_metadata.patreon
        const isPatron = patreonToken !== ("unchecked" || "skipped")
        return (isPatron) ? patreonProfileFetcher(patreonToken) : patreonToken
      })
      .then(patreonData => {
        userData.app_metadata.patreon = patreonData
        return res.end(JSON.stringify(userData));
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