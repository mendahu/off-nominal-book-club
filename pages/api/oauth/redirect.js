import { patreon as patreonAPI , oauth as patreonOAuth } from 'patreon'
 
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const patreonOAuthClient = patreonOAuth(CLIENT_ID, CLIENT_SECRET)
 
const redirectURL = process.env.REDIRECT_URI

export default (request, response) => {
  
  //extracts authorization code from request query param
  const oauthGrantCode = request.query.code


  // patreonOAuthClient
  //     .getTokens(oauthGrantCode, redirectURL)
  //     .then(function(tokensResponse) {
  //         const patreonAPIClient = patreonAPI(tokensResponse.access_token)
  //         return patreonAPIClient('/current_user')
  //     })
  //     .then(function(result) {
  //         var store = result.store
  //         // store is a [JsonApiDataStore](https://github.com/beauby/jsonapi-datastore)
  //         // You can also ask for result.rawJson if you'd like to work with unparsed data
  //         response.end(store.findAll('user').map(user => user.serialize()))
  //     })
  //     .catch(function(err) {
  //         console.error('error!', err)
  //         response.end(err)
  //     })

};