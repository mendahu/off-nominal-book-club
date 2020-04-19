import auth0 from '../../../lib/auth0';
import userProfileFetcher from '../../../src/helpers/userProfileFetcher'

export default auth0.requireAuthentication(async function me(req, res) {

  const userProfile = await userProfileFetcher(req)
  return res.end(JSON.stringify(userProfile))

});