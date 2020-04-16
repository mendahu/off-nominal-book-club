import querystring from 'querystring'
import axios from 'axios'
import auth0 from '../../../lib/auth0';
import { updatePatreonData } from '../auth0User';

export default async function patreonTokenFetcher(code, req) {

  const CLIENT_ID = process.env.PAT_CLIENT_ID
  const CLIENT_SECRET = process.env.PAT_CLIENT_SECRET
  const REDIRECT_URI = process.env.PAT_REDIRECT_URI

  const patreonData = {
    code,
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI
  }

  const { user } = await auth0.getSession(req);
  if (!user) return false;
  const { sub } = user;

  const { data } = await axios.post('https://www.patreon.com/api/oauth2/token', querystring.stringify(patreonData))
  return updatePatreonData(sub, data)

}
