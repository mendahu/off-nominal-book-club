import axios from 'axios'

export default function patreonProfileFetcher(token) {

  const headers = { "Authorization": `${token.token_type} ${token.access_token}` }

  const fields = [
    "first_name",
    "last_name",
    "image_url",
  ].join(',')

  
  const url = `https://www.patreon.com/api/oauth2/v2/identity?include=memberships&fields%5Buser%5D=${fields}`
  
  console.log(url)

  return axios.get(url, { headers })
    .then(res => res.data)
    .catch(err => console.error(err))
}