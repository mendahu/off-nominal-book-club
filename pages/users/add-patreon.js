import { Typography, Button } from '@material-ui/core'
import { useFetchUser } from '../../lib/user'
import Layout from "../../src/components/DefaultLayout";

export default function Register() {

  const { user, loading } = useFetchUser();

  if (loading) {
    return (
      <Layout>
        <Typography>Validating Credentials...</Typography>
      </Layout>
    )
  }


  
  return (  
    <Layout>
      <Typography>Great work connecting Patreon!</Typography>
      <Typography>Let's just verify a couple more details.</Typography>
    </Layout>
  )
}
