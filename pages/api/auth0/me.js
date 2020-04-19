
import userProfileFetcher from '../../../src/helpers/userProfileFetcher'

export default auth0.requireAuthentication(async function me(req, res) {

  const userProfile = userProfileFetcher(req)

  return res.end(JSON.stringify(userProfile))

});