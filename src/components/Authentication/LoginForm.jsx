import { Button } from "@material-ui/core";
import { useState } from 'react'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

const LoginForm = () => {
  const cookies = parseCookies()
  const [ userId, setUserId ] = useState(cookies.userId)


  const logUserIn = () => {
    setCookie(null, 'userId', 1, { maxAge: 24 * 60 * 60, path: "/" })
    setUserId(1);
  }

  const logUserOut = () => {
    destroyCookie(null, 'userId');
    setUserId(null);
  }

  if (!userId) {
    return (
      <div>
        <Button onClick={logUserIn} variant="contained" color="default">Login</Button>
      </div>
    )
  } else {
    return (
      <div>
        <Button onClick={logUserOut} variant="contained" color="default">Logout</Button>
      </div>
    )
  }  
}

export default LoginForm