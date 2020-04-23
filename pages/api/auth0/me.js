import userProfileFetcher from '../../../src/helpers/userProfileFetcher'

export default async function me(req, res) {

  const userProfile = await userProfileFetcher(req)
  return res.end(JSON.stringify(userProfile))

};