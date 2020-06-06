import Message from '../../src/components/Utility/Message';
import Registration from '../../src/components/Registration/Registration';
import patreonTokenFetcher from '../../src/helpers/patreon/tokenFetcher';
import { useFetchUser } from '../../lib/user';
import Router from 'next/router';
import { useState } from 'react';
import getAuth0UserSub from '../../src/helpers/auth0/auth0Sub';
import Layout from '../../src/components/DefaultLayout';

export default function Register({ justConnectedPatreon }) {
  const { user, loading } = useFetchUser();
  const [promptForProfile, setPromptForProfile] = useState(true);
  const [patreonOverride, setPatreonOverride] = useState(false);

  if (loading) {
    return (
      <Layout>
        <Message message="Validating Credentials" variant="loading" />
      </Layout>
    );
  }

  //user is not logged in
  if (!loading && !user) {
    Router.push('/');
    return (
      <Layout>
        <Message message="Redirecting" variant="loading" />
      </Layout>
    );
  }

  const promptForPatreon = user.patreon.state === 'unchecked';

  if (!promptForPatreon && !promptForProfile) Router.replace('/');

  const handleSkip = () => {
    setPromptForProfile(true);
    setPatreonOverride(true);
  };

  return (
    <Layout>
      {patreonOverride || promptForPatreon || promptForProfile ? (
        <Registration
          patreon={patreonOverride ? false : promptForPatreon}
          onSkip={handleSkip}
          user={user}
        />
      ) : (
        <Message message="Redirecting..." variant="loading" />
      )}
    </Layout>
  );
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
