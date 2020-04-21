import profileFormatter from './patreon/profileFormatter'
import userDataFormatter from './userDataFormatter'
import { getAuth0User } from './auth0/auth0User';
import patreonProfileFetcher from './patreon/profileFetcher'
import auth0 from '../../lib/auth0';

export default async function userProfileFetcher(req) {
  const returnedUserObj = await auth0.getSession(req)
  if (!returnedUserObj) return null;
  const { user: { sub } } = returnedUserObj

  const auth0User = await getAuth0User(sub)
  const userData = userDataFormatter(auth0User)
  
  const patreonToken = auth0User.app_metadata.patreon
  const isPatron = !(patreonToken === "unchecked" || patreonToken === "skipped")

  const patreonData = isPatron ? await patreonProfileFetcher(req, patreonToken) : patreonToken

  userData.app_metadata.patreon = profileFormatter(patreonData);

  return userData;
}