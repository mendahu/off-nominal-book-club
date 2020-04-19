import auth0 from '../../../lib/auth0';
import { updatePatreonData } from '../auth0/auth0User';
import { oauth as patreonOAuth } from 'patreon'

export default async function patreonTokenFetcher(code, req, options) {

  const CLIENT_ID = process.env.PAT_CLIENT_ID
  const CLIENT_SECRET = process.env.PAT_CLIENT_SECRET
  const REDIRECT_URI = process.env.PAT_REDIRECT_URI

  const { user } = await auth0.getSession(req);
  if (!user) return false;
  const { sub } = user;

  const patreonOAuthClient = patreonOAuth(CLIENT_ID, CLIENT_SECRET)

  let patToken;
  if (options?.refresh === true) {
    patToken = await patreonOAuthClient.refreshToken(options.refreshToken)
  } else {
    patToken = await patreonOAuthClient.getTokens(code, REDIRECT_URI)
  }

  const currentDate = Date.now()
  patToken.expiry_date = currentDate + ( patToken.expires_in * 1000 )

  return updatePatreonData(sub, patToken)

}
