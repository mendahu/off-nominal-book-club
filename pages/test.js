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

  return (
    <Layout>
      <Typography>User Email: {user?.name || "undefined"}</Typography>
      <Typography>User ONBC Id: {user?.app_metadata?.onbc_id || "undefined"}</Typography>
      <Typography>User Patreon Name: {user?.app_metadata?.patreon?.name || "undefined"}</Typography>
    </Layout>
  );
}
