import axios from 'axios'
import querystring from 'querystring'
 
const CLIENT_ID = process.env.PAT_CLIENT_ID
const CLIENT_SECRET = process.env.PAT_CLIENT_SECRET
const REDIRECT_URI = process.env.PAT_REDIRECT_URI_FINAL

export default (req, res) => {
  
  const patreonData = {
    code: req.query.code,
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI
  }

  return axios.post('https://www.patreon.com/api/oauth2/token', querystring.stringify(patreonData))
    .then(response => {
        console.log(response)
        return response;
    })
    .catch(err => {
        throw err;
    })
};