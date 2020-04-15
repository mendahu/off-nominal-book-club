import querystring from 'querystring'
import axios from 'axios'
import auth0 from '../../../lib/auth0';
import { ManagementClient } from 'auth0'

const CLIENT_ID = process.env.PAT_CLIENT_ID
const CLIENT_SECRET = process.env.PAT_CLIENT_SECRET
const REDIRECT_URI = process.env.PAT_REDIRECT_URI

export default function patreonTokenFetcher(code, req) {

  const patreonData = {
    code,
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI
  }

  let token;
  
  return axios.post('https://www.patreon.com/api/oauth2/token', querystring.stringify(patreonData))
    .then(response => {
      token = response.data
      return auth0.getSession(req)
    })
    .then(session => {
  
      const auth0client = new ManagementClient({
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        scope: 'update:users update:users_app_metadata'
      })
  
      const { user } = session;
      const params = { "id": user.sub }
      const data = { "app_metadata": { "patreon": token } }
  
      return auth0client.updateUser(params, data)
    })
    .then((res) => {
      return true;
    })
    .catch(err => {
      console.error(err)
      return false;
    })
}
