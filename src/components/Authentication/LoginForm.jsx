import { Button } from "@material-ui/core";
import { useState } from 'react'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

const LoginForm = (props) => {

  

  if (!props.userId) {
    return (
      <div>
        <Button onClick={() => props.logUserIn(1)} variant="contained" color="default">Login</Button>
      </div>
    )
  } else {
    return (
      <div>
        <Button onClick={() => props.logUserOut()} variant="contained" color="default">Logout</Button>
      </div>
    )
  }  
}

export default LoginForm