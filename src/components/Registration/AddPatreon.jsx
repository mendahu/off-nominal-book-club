import { Typography, Button } from '@material-ui/core'
import Layout from '../DefaultLayout'
import patreonAuthUrlGenerator from '../../../src/helpers/patreon/authUrlGenerator'

const patreonAuthOptions = {
  client_id: process.env.PAT_CLIENT_ID,
  redirect_uri: process.env.PAT_REDIRECT_URI
}

export default function AddPatreon() {
  return (
    <Layout>
      <Typography>We just need a little more info!</Typography>
      <Typography>Connect your Patreon account to be able to rate and review books, as well as add new books to the app.</Typography>
      <Button variant="contained" color="secondary" href={patreonAuthUrlGenerator(patreonAuthOptions)}>Connect your Patreon</Button>
    </Layout>
  )
}