import { useContext } from 'react'
import { Button } from "@material-ui/core";
import UserContext from '../../UserContext'

const LoginForm = () => {

  const { userId, logUserIn, logUserOut } = useContext(UserContext)

  if (!userId) {
    return (
      <div>
        <Button onClick={() => logUserIn(2)} variant="contained" color="default">Login Owner</Button>
        <Button onClick={() => logUserIn(1)} variant="contained" color="default">Login Moderator</Button>
        <Button onClick={() => logUserIn(3)} variant="contained" color="default">Login Member</Button>
      </div>
    )
  } else {
    return (
      <div>
        <Button onClick={() => logUserOut()} variant="contained" color="default">Logout User {userId}</Button>
      </div>
    )
  }  
}

export default LoginForm