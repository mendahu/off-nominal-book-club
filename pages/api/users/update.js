import axios from 'axios'
import auth0 from '../../../lib/auth0';

export default function update(req, res) {
  
  const { userId } = req.body;
  const apiBaseUrl = 'https://' + process.env.AUTH0_DOMAIN + '/api/v2/users/'

  const generateUpdateConfig = (auth0id, onbcId) => {
    return {
      url: apiBaseUrl + auth0id,
      method: "PATCH",
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${process.env.AUTH0_MANAGEMENT_TOKEN}`
      },
      data: { "app_metadata": { "onbc_id": onbcId } }
    }
  }
  
  if (typeof window === 'undefined') {
     return auth0.getSession(req)
      .then(session => {
        const { user } = session;
        return user.sub;
      })
      .then(auth0sub => {
        return axios(generateUpdateConfig(auth0sub, userId))
      })
      .catch(err => console.error(err))
  }

  return;

};
