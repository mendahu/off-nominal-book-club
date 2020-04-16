import Message from "../src/components/Utility/Message";
import Layout from "../src/components/DefaultLayout";
import { Typography } from '@material-ui/core'
import { useFetchUser } from '../lib/user'
import AddPatreon from "../src/components/Registration/AddPatreon";

export default function TestUser() {

  return (
    <AddPatreon />
  );
}
