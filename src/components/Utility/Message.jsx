import Layout from "../DefaultLayout";
import { Typography } from '@material-ui/core'

export default function BookList(props) {

  return (
    <Layout>
      <Typography>{props.message}</Typography>
    </Layout>
  );
}
