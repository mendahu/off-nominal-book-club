import { updatePatreonData } from '../auth0/auth0User';
import { oauth as patreonOAuth } from 'patreon';

const CLIENT_ID = process.env.NEXT_PUBLIC_PAT_CLIENT_ID;
const CLIENT_SECRET = process.env.PAT_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_PAT_REDIRECT_URI;
const patreonOAuthClient = patreonOAuth(CLIENT_ID, CLIENT_SECRET);

export default async function patreonTokenFetcher(code, auth0sub, options) {
  let patToken;

  try {
    patToken = options?.refresh
      ? await patreonOAuthClient.refreshToken(options.refreshToken)
      : await patreonOAuthClient.getTokens(code, REDIRECT_URI);
  } catch (error) {
    console.error('Error at token fetch', error);
    throw error;
  }

  const currentDate = Date.now();
  patToken.expiry_date = currentDate + patToken.expires_in * 1000;

  try {
    await updatePatreonData(auth0sub, patToken);
    return patToken;
  } catch (error) {
    throw error;
  }
}
