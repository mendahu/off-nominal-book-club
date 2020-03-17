import { TextField, Paper, Button } from "@material-ui/core";


const LogoutForm = (props) => {
  return (
    <Paper component='form'>
      <form action="/api/users/logout" method="post" noValidate autoComplete="off" name="logout" encType="application/x-www-form-urlencoded">
        <Button onClick={props.clickHandler} variant="contained" color="primary">Logout</Button>
      </form>
    </Paper>
  )
}

export default LogoutForm