import Message from '../../src/components/Utility/Message'
import userProfileValidator from '../../src/helpers/userProfileValidator'
import Registration from '../../src/components/Registration/Registration'
import patreonTokenFetcher from '../../src/helpers/patreon/tokenFetcher'
import { useFetchUser } from '../../lib/user'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '../../src/components/DefaultLayout'

export default function Register({justConnectedPatreon}) {

  const { user, loading } = useFetchUser();
  const [ promptForPatreon, setPromptForPatreon ] = useState(false)
  const [ promptForProfile, setPromptForProfile ] = useState(justConnectedPatreon)

  if (loading) {
    return (
    <Layout>
      <Message message="Validating Credentials" variant='loading'/>
    </Layout>
    )
  }
  
  //user is not logged in
  if (!loading && !user) {
    Router.replace("/");
    return (
      <Layout>
        <Message message="Redirecting" variant='loading'/>
      </Layout>
      )
    }
    
  // checks for any errors in the profile fetched which would indicate system issues 
  // and shows error to user
  const profileError = userProfileValidator(user)
  if (profileError) return profileError
  
  useEffect(() => {
    if (user.app_metadata.patreon === "unchecked") setPromptForPatreon(true);
  }, [user])

  if (!promptForPatreon && !promptForProfile) Router.replace("/");

  return (
    <Layout>
      {(promptForPatreon || promptForProfile) 
        ? <Registration 
          patreon={promptForPatreon}
          onSkip={setPromptForProfile(true)} 
          user={user}/>
        : <Message message="Redirecting..." variant='loading'/>
      }
    </Layout>
  )
}

export async function getServerSideProps(context) {

  const code = context.query?.code
  let justConnectedPatreon = false

  if (code) {
    const user = await patreonTokenFetcher(code, context.req)
    justConnectedPatreon = typeof user.app_metadata.patreon !== "string"
  } 
  
  return { props: { justConnectedPatreon } }
}
