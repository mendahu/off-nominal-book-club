import auth0 from '../../../lib/auth0';
import patreonProfileFetcher from '../../../src/helpers/patreon/profileFetcher'
import userDataFormatter from '../../../src/helpers/userDataFormatter'
import getAuth0User from '../../../src/helpers/getAuth0user';

export default auth0.requireAuthentication(async function me(req, res) {
  
  const { user } = await auth0.getSession(req)
  if (!user) return null;
  
  const { sub } = user;
  let userData;

  const auth0User = await getAuth0User(sub)
  userData = userDataFormatter(auth0User)
  
  const patreonToken = auth0User.app_metadata.patreon
  const isPatron = patreonToken !== ("unchecked" || "skipped")
  const patreonData = isPatron ? await patreonProfileFetcher(patreonToken) : patreonToken

  userData.app_metadata.patreon = patreonData
  return res.end(JSON.stringify(userData))

});