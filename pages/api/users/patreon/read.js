import querystring from 'querystring'

export default function update(req, res) {

  return axios.get('https://www.patreon.com/api/oauth2/v2/identity', {
    headers: {
      "Authorization": `Bearer ${patToken.access_token}`
    },
    params: querystring.stringify({ 'fields[user]': "first_name,last_name,image_url"})
  })
    .then(res => {
      return res.data
    })
    .catch(err => console.error(err))

};
