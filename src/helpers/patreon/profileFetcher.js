import axios from 'axios'
import profileFormatter from './profileFormatter'

export default async function patreonProfileFetcher(token) {

  const headers = { "Authorization": `${token.token_type} ${token.access_token}` }

  const fields = [
    "first_name",
    "last_name",
    "image_url",
  ].join(',')

  const includes = [
    "memberships",
    "campaign"
  ].join(',')
  
  const url = `https://www.patreon.com/api/oauth2/v2/identity?include=${includes}&fields%5Buser%5D=${fields}`
  
  const patreonData = await axios.get(url, { headers })
  return profileFormatter(patreonData.data)

}