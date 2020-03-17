import { Button } from "@material-ui/core";
import { useState } from 'react'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

const LoginForm = (props) => {
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
      <div>
        <Button onClick={logUserIn} variant="contained" color="primary">Login</Button>
      </div>
    )
  } else {
    return (
      <div>
        <Button onClick={logUserOut} variant="contained" color="primary">Logout</Button>
      </div>
    )
  }  
}

export async function getServerSideProps(context) {

  const cookies = parseCookies(context);
  const userId = cookies.userId || null;
  console.log(userId)

  return {
    props: {userId: userId}, 
  }
}

export default LoginForm