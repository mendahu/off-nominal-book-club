import { Typography, Button } from '@material-ui/core'
import { useFetchUser } from '../../lib/user'
import Layout from "../../src/components/DefaultLayout";
import Router from 'next/router'

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

const tempUrl = 'https://www.patreon.com/oauth2/authorize?response_type=code&client_id=yMa6NmXk1WOvHFG15OYs2nGoFaH7VEt_r97NHn4_z7DultKm5EDuWwGvcMSsestY&redirect_uri=https://jake-b06600a5.localhost.run/api/oauth/patreon'

export default function Register() {

  const { user, loading } = useFetchUser();
  
  if (loading) {
    return (
      <Layout>
        <Typography>Validating Credentials...</Typography>
      </Layout>
    )
  }

  if (!user) { 

    Router.replace("/")
    return (
      <Layout>
        <Typography>Not logged in. Redirecting to main page...</Typography>
      </Layout>
    )

  } else {

    const patreonOptions = {
      client_id: process.env.PAT_CLIENT_ID,
      redirect_uri: process.env.PAT_REDIRECT_URI
    }
  
    const patreonAuthUrl = patreonAuthUrlGenerator(patreonOptions)
  
    return (  
      <Layout>
        <Typography>We just need a little more info!</Typography>
        <Typography>Connect your Patreon account to be able to rate and review books, as well as add new books to the app.</Typography>
        <Button variant="contained" color="secondary" href={tempUrl}>Connect your Patreon</Button>
      </Layout>
    )

  }
}
