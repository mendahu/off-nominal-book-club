import Message from '../../src/components/Utility/Message'
import userProfileValidator from '../../src/helpers/userProfileValidator'
import AddPatreon from '../../src/components/Registration/AddPatreon'
import patreonTokenFetcher from '../../src/helpers/patreon/tokenFetcher'
import { useFetchUser } from '../../lib/user'
import Router from 'next/router'
import { useState } from 'react'

export default function Register(props) {

  console.log(props)

  const { justConnectedPatreon } = props

  console.log(justConnectedPatreon)

  const { user, loading } = useFetchUser();

  if (loading) {
    return <Message message="Validating Credentials" variant='loading'/>
  }

  //user is not logged in
  if (!loading && !user) {
    Router.replace("/");
    return <Message message="Redirecting" variant='loading'/>
  }

  // checks for any errors in the profile fetched which would indicate system issues 
  // and shows error to user
  const profileError = userProfileValidator(user)
  if (profileError) return profileError

  //Prompts user to add Patreon account to new account
  if (user.app_metadata.patreon === "unchecked") return <AddPatreon />

  //Prompts for final registration information
  if (justConnectedPatreon) return <CompleteProfile />

  Router.replace("/");
  return <Message message="Redirecting..." variant='loading'/>
}

export async function getServerSideProps(context) {

  const code = context.query?.code

  let justConnectedPatreon = false

  if (code) {

    patreonTokenFetcher(code, context.req)
      .then(user => {
        justConnectedPatreon = typeof user.app_metadata.patreon !== "string"
      })
      .catch(err => console.error(err))
      .finally(() => {
        return { props: { justConnectedPatreon } }
      })
  }

  return { props: { justConnectedPatreon } }

}
