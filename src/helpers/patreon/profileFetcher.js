import axios from 'axios'
import profileFormatter from './profileFormatter'

export default async function patreonProfileFetcher(token) {

  const headers = { "Authorization": `${token.token_type} ${token.access_token}` }

  const userFields = [
    "full_name",
    "image_url",
    "thumb_url"
  ].join(',')

  const memberFields = [
    "patron_status",
    "currently_entitled_amount_cents",
    "last_charge_date",
    "pledge_relationship_start"
  ].join(',')

  const campaignFields = [
    "creation_name"
  ].join(',')

  const includes = [
    "memberships",
    "memberships.campaign"
  ].join(',')
  
  const url = `https://www.patreon.com/api/oauth2/v2/identity?include=${includes}&fields%5Buser%5D=${userFields}&fields%5Bmember%5D=${memberFields}&fields%5Bcampaign%5D=${campaignFields}`
  
  return await axios.get(url, { headers })

}