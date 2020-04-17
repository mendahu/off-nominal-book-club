import Message from '../../src/components/Utility/Message'
import userProfileValidator from '../../src/helpers/userProfileValidator'
import Registration from '../../src/components/Registration/Registration'
import patreonTokenFetcher from '../../src/helpers/patreon/tokenFetcher'
import { useFetchUser } from '../../lib/user'
import Router from 'next/router'

export default function Register({justConnectedPatreon}) {

  const { user, loading } = useFetchUser();

  if (loading) {
    return <Message message="Validating Credentials" variant='loading'/>
  }

  //user is not logged in
  if (!loading && !user) {
    Router.replace("/");
    return <Message message="Redirecting" variant='loading'/>
  }

  console.log(user)

  // checks for any errors in the profile fetched which would indicate system issues 
  // and shows error to user
  const profileError = userProfileValidator(user)
  if (profileError) return profileError

  //Prompts user to add Patreon account to new account
  if (user.app_metadata.patreon === "unchecked") return <Registration patreon={true} />

  //Prompts for final registration information
  if (justConnectedPatreon) return <Registration patreon={false} user={user}/>

  Router.replace("/");
  return <Message message="Redirecting..." variant='loading'/>
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
