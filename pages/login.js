import LoginForm from '../src/components/Authentication/LoginForm'
import LogoutForm from '../src/components/Authentication/LogoutForm'
import { useState } from 'react'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

const Login = (props) => {
  
  const [ userId, setUserId ] = useState(props.userId)


  const logUserIn = () => {
    setCookie(null, 'userId', 1, { maxAge: 24 * 60 * 60 })
    setUserId(1);
  }

  const logUserOut = () => {
    destroyCookie(null, 'userId');
    setUserId(null);
  }

  if (!userId) {
    return (
      <LoginForm clickHandler={logUserIn} />
    )
  } else {
    return (
      <>
        <p>You're logged in!</p>
        <LogoutForm clickHandler={logUserOut} />
      </>
    )
  }
};

export async function getServerSideProps(context) {

  const cookies = parseCookies(context);
  const userId = cookies.userId || null;
  console.log(userId)

  return {
    props: {userId: userId}, 
  }
}

export default Login
