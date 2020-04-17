import auth0 from '../../../lib/auth0';
import profileFormatter from '../../../src/helpers/patreon/profileFormatter'
import userDataFormatter from '../../../src/helpers/userDataFormatter'
import { getAuth0User } from '../../../src/helpers/auth0User';
import { patreon as patreonAPI } from 'patreon'

export default auth0.requireAuthentication(async function me(req, res) {
  
  const { user } = await auth0.getSession(req)
  if (!user) return null;
  
  const { sub } = user;

  const auth0User = await getAuth0User(sub)
  const userData = userDataFormatter(auth0User)
  
  const patreonToken = auth0User.app_metadata.patreon
  const isPatron = !(patreonToken === "unchecked" || patreonToken === "skipped")

  let patreonData;
  if (isPatron) {
    const patreonClient = patreonAPI(patreonToken.access_token)
    patreonData = await patreonClient('/current_user')
  } else {
    patreonData = patreonToken
  }

  userData.app_metadata.patreon = profileFormatter(patreonData.rawJson);
  return res.end(JSON.stringify(userData))

});