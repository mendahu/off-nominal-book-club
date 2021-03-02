import Message from "../../src/components/Utility/Message";
import Router from "next/router";
import Layout from "../../src/components/DefaultLayout";
import AddPatreon from "../../src/components/Registration/AddPatreon";
import getAuth0USerSub from "../../src/helpers/auth0/auth0Sub";
import patreonTokenFetcher from "../../src/helpers/patreon/tokenFetcher";
import { useBookClubUser } from "../../lib/bookClubUser";

type RegisterProps = {
  justConnectedPatreon: Boolean;
};

const renderMessage = (message, variant) => {
  return (
    <Layout>
      <Message message={message} variant={variant} />
    </Layout>
  );
};

const Register = ({ justConnectedPatreon }: RegisterProps) => {
  const { user, loading } = useBookClubUser();

  if (loading) {
    return renderMessage("Validating Credentials", "loading");
  }

  //no user is logged in, redirect
  if (!loading && !user) {
    Router.push("/");
    return renderMessage("Redirecting", "loading");
  }

  if (user.patreon.state === "unchecked") {
    return (
      <Layout>
        <AddPatreon skipProfile={() => Router.push(`/users/${user.onbc_id}`)} />
      </Layout>
    );
  } else {
    Router.push(
      justConnectedPatreon ? `/users/${user.onbc_id}?tutorial=true` : "/"
    );
    return renderMessage("Redirecting", "loading");
  }
};

export async function getServerSideProps(context) {
  const code: string = context.query?.code;
  let justConnectedPatreon = false;

  if (code) {
    const sub = await getAuth0USerSub(context.req, context.res);
    const token = await patreonTokenFetcher(code, sub);
    justConnectedPatreon = typeof token !== "string";
  }

  return { props: { justConnectedPatreon } };
}

export default Register;
