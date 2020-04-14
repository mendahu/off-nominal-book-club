import { Typography, Button } from '@material-ui/core'
import Message from '../../src/components/Utility/Message'
import userProfileValidator from '../../src/helpers/userProfileValidator'
import patreonAuthUrlGenerator from '../../src/helpers/patreonAuthUrlGenerator'
import patreonTokenFetcher from '../../src/helpers/patreonTokenFetcher'
import { useFetchUser } from '../../lib/user'
// import { useState } from 'react'
import Layout from "../../src/components/DefaultLayout";
import Router from 'next/router'

export default function Register({justConnectedPatreon}) {

  const { user, loading } = useFetchUser();

  if (loading) {
    return <Message message="Validating Credentials" />
  }

  if (!loading && !user) {
    Router.replace("/");
    return <Message message="Redirecting" />
  }

  const profileError = userProfileValidator(user)
  if (profileError) return profileError

  if (user.app_metadata.patreon === "unchecked") {

    const patreonAuthOptions = {
      client_id: process.env.PAT_CLIENT_ID,
      redirect_uri: process.env.PAT_REDIRECT_URI
    }

    return (
      <Layout>
        <Typography>We just need a little more info!</Typography>
        <Typography>Connect your Patreon account to be able to rate and review books, as well as add new books to the app.</Typography>
        <Button variant="contained" color="secondary" href={patreonAuthUrlGenerator(patreonAuthOptions)}>Connect your Patreon</Button>
      </Layout>
      )
  }

  Router.replace("/");
  return <Message message="Redirecting..." />
}

export async function getServerSideProps(context) {

  const code = context.query?.code
  if (code) {
    const justConnectedPatreon = patreonTokenFetcher(code, context.req)
    .catch(err => console.error(err))
    .finally(() => {
      return { props: { justConnectedPatreon } }
    })
  }

  return { props: { justConnectedPatreon: false } }

}
