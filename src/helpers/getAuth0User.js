import { ManagementClient } from 'auth0'

const auth0client = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'read:users read:user_idp_tokens'
})

export default function getAuth0User(sub) {
  const params = { "id": sub }
  return auth0client.getUser(params)
}