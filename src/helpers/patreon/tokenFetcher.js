import { updatePatreonData } from '../auth0/auth0User';
import { oauth as patreonOAuth } from 'patreon'

export default async function patreonTokenFetcher(code, auth0sub, { refresh, refreshToken }) {
  const CLIENT_ID = process.env.PAT_CLIENT_ID
  const CLIENT_SECRET = process.env.PAT_CLIENT_SECRET
  const REDIRECT_URI = process.env.PAT_REDIRECT_URI
  const patreonOAuthClient = patreonOAuth(CLIENT_ID, CLIENT_SECRET)

  let patToken;

  try {
    patToken = (refresh) 
     ? await patreonOAuthClient.refreshToken(refreshToken)
     : await patreonOAuthClient.getTokens(code, REDIRECT_URI)
  }
  catch(error) {
    console.error("Error at token fetch", error)
    throw error;
  }

  const currentDate = Date.now()
  patToken.expiry_date = currentDate + ( patToken.expires_in * 1000 )

  return updatePatreonData(auth0sub, patToken)

}
