import Message from '../../src/components/Utility/Message';
import patreonTokenFetcher from '../../src/helpers/patreon/tokenFetcher';
import { useFetchUser } from '../../lib/user';
import Router from 'next/router';
import getAuth0UserSub from '../../src/helpers/auth0/auth0Sub';
import Layout from '../../src/components/DefaultLayout';
import AddPatreon from '../../src/components/Registration/AddPatreon';

export default function Register({ justConnectedPatreon }) {
  const { user, loading } = useFetchUser();

  if (loading) {
    return (
      <Layout>
        <Message message="Validating Credentials" variant="loading" />
      </Layout>
    );
  }

  //no user is logged in, redirect
  if (!loading && !user) {
    Router.push('/');
    return (
      <Layout>
        <Message message="Redirecting" variant="loading" />
      </Layout>
    );
  }

  const redirect = () => {
    Router.replace('/');
  };

  if (user.patreon.state === 'unchecked') {
    return (
      <Layout>
        <AddPatreon skipProfile={redirect} />
      </Layout>
    );
  } else {
    redirect();

    return (
      <Layout>
        <Message message="Redirecting..." variant="loading" />
      </Layout>
    );
  }
}

export async function getServerSideProps(context) {
  const code = context.query?.code;
  let justConnectedPatreon = false;

  if (code) {
    const sub = await getAuth0UserSub(context.req);
    const token = await patreonTokenFetcher(code, sub);
    justConnectedPatreon = typeof token !== 'string';
  }

  return { props: { justConnectedPatreon } };
}
