import Message from "../src/components/Utility/Message";
import Layout from "../src/components/DefaultLayout";
import { Typography } from '@material-ui/core'
import { useFetchUser } from '../lib/user'
import CompleteProfile from "../src/components/Registration/CompleteProfile";

export default function TestUser() {

  return (
    <CompleteProfile />
  );
}
