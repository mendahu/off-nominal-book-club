import querystring from 'querystring'
import axios from 'axios'
import auth0 from '../../../lib/auth0';
import { updatePatreonData } from '../auth0User';
import { patreon as patreonAPI, oauth as patreonOAuth } from 'patreon'

export default async function patreonTokenFetcher(code, req) {

  const CLIENT_ID = process.env.PAT_CLIENT_ID
  const CLIENT_SECRET = process.env.PAT_CLIENT_SECRET
  const REDIRECT_URI = process.env.PAT_REDIRECT_URI

  const { user } = await auth0.getSession(req);
  if (!user) return false;
  const { sub } = user;

  const patreonOAuthClient = patreonOAuth(CLIENT_ID, CLIENT_SECRET)
  const patToken = await patreonOAuthClient.getTokens(code, REDIRECT_URI)

  return updatePatreonData(sub, patToken)

}
