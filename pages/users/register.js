import { Typography, Button } from '@material-ui/core'
import { useFetchUser } from '../../lib/user'
import Layout from "../../src/components/DefaultLayout";
import axios from 'axios'
import Router from 'next/router'

export default function Register() {

  const { user, loading } = useFetchUser();

  if (loading) {
    return (
      <Layout>
        <Typography>Validating Credentials...</Typography>
      </Layout>
    )
  }

  if (!user || user.app_metadata?.onbc_id) Router.replace("/")
  
  const authUser = axios.get('/api/users/register')
    .then((res) => axios.patch('/api/users/update', { "userId": res.data[0] }))
    .catch(err => console.error(err));

  return (  
    <Layout>
      <Typography>We just need a little more info!</Typography>
    </Layout>
  )
}
