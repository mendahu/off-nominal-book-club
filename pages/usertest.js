import Layout from "../src/components/DefaultLayout";
import { Typography } from '@material-ui/core'
import { useFetchUser } from '../lib/user'

export default function TestUser() {
  const { user, loading } = useFetchUser();
 
  if (loading) return (
    <Layout>
      <Typography>Loading...</Typography>
    </Layout>
  )

  if (!user && !loading) return (
    <Layout>
    <Typography>Not logged in.</Typography>
  </Layout>
  )

  console.log(user)

  return (
    <Layout>
      <Typography>User Email: {user?.name || "undefined"}</Typography>
      <Typography>User ONBC Id: {user?.app_metadata?.onbc_id || "undefined"}</Typography>
      <Typography>User Patreon Name: {user?.app_metadata?.patreon?.data.attributes.first_name || "undefined"}</Typography>
      <img src={user.app_metadata.patreon.data.attributes.image_url} />
    </Layout>
  );
}