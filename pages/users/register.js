import { Typography, Button } from '@material-ui/core'
import { useFetchUser } from '../../lib/user'
import { useState } from 'react'
import Layout from "../../src/components/DefaultLayout";
import Router from 'next/router'
import querystring from 'querystring'
import axios from 'axios'
import auth0 from '../../lib/auth0';
import { ManagementClient } from 'auth0'

const patreonAuthUrlGenerator = (options) => {
  return (
    'https://www.patreon.com/oauth2/authorize?response_type=code&client_id=' +
    options.client_id +
    '&redirect_uri=' +
    options.redirect_uri +
    (options.scope ? '&scope=' + options.scope : "") +
    (options.state ? '&state=' + options.state : "")
  )
}

const patreonOptions = {
  client_id: process.env.PAT_CLIENT_ID,
  redirect_uri: process.env.PAT_REDIRECT_URI
}

const patreonAuthUrl = patreonAuthUrlGenerator(patreonOptions)

const tempUrl = 'https://www.patreon.com/oauth2/authorize?response_type=code&client_id=yMa6NmXk1WOvHFG15OYs2nGoFaH7VEt_r97NHn4_z7DultKm5EDuWwGvcMSsestY&redirect_uri=https://offnom-23d374ea.localhost.run/users/register'

export default function Register({ hasConnected }) {

  const { user, loading } = useFetchUser();
  const [ patConnect, setPatConnect ] = useState(hasConnected)
  const [ patData, setPatData ] = useState(null)

  if (patConnect && !patData) {
    setPatData({
      "first_name": "Jake",
      'last-name': "Robins",
      'image-url': 'http://www.example.com/image.png'
    })
  }

  if (!user && !loading) Router.replace("/")

  return (
    <Layout>
      {loading && <Typography>Validating Credentials...</Typography>}
      {!user && !loading && <Typography>Not logged in. Redirecting to main page...</Typography>}
      {user && !loading && !patToken &&
        <>
          <Typography>We just need a little more info!</Typography>
          <Typography>Connect your Patreon account to be able to rate and review books, as well as add new books to the app.</Typography>
          <Button variant="contained" color="secondary" href={tempUrl}>Connect your Patreon</Button>
        </>
      }
      {user && !loading && patConnect && !patData &&
        <>
          <Typography>Fetching Patreon Data</Typography>
        </>
      }
      {user && !loading && patConnect && patData &&
        <>
          <img src={patData.attributes?.image_url} />
          <Typography>User {patData.attributes?.first_name} {patData.attributes?.last_name}</Typography>
        </>
      }
    </Layout>
  )
}

export async function getServerSideProps(context) {

  const code = context.query?.code

  if (code) {
    const CLIENT_ID = process.env.PAT_CLIENT_ID
    const CLIENT_SECRET = process.env.PAT_CLIENT_SECRET
    const REDIRECT_URI = process.env.PAT_REDIRECT_URI

    const patreonData = {
      code,
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI
    }
  
    let token;

    return axios.post('https://www.patreon.com/api/oauth2/token', querystring.stringify(patreonData))
      .then(response => {
        token = response.data
        return auth0.getSession(context.req)
      })
      .then(session => {

        const auth0client = new ManagementClient({
          domain: process.env.AUTH0_DOMAIN,
          clientId: process.env.AUTH0_CLIENT_ID,
          clientSecret: process.env.AUTH0_CLIENT_SECRET,
          scope: 'update:users update:users_app_metadata'
        })

        const { user } = session;
        const params = { "id": user.sub }
        const data = { "app_metadata": { "patreon": token } }

        return auth0client.updateUser(params, data)
      })
      .then(() => {
        return { props: { hasConnected: true } }
      })
      .catch(err => {
        throw err;
      })
  }

  return { props: { hasConnected: false } }

}
