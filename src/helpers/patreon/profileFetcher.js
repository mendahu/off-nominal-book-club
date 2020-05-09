import axios from 'axios'
import tokenFetcher from './tokenFetcher'
import moment from 'moment'

export default async function patreonProfileFetcher(auth0sub, token) {

  //refreshes token if it will expire in the next 3 weeks
  const expiry = moment(token.expiry_date);
  const horizon = moment().add(21, 'days');
  if (expiry.isBefore(horizon)) {
    try {
      const result = await tokenFetcher(null, auth0sub, { refresh: true, refreshToken: token.refresh_token })
      token = result.app_metadata?.patreon
    }
    catch(error) {
      console.error("Error refreshing token", error)
    }
  }

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