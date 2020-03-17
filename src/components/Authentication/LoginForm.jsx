import { TextField, Paper, Button } from "@material-ui/core";


const LoginForm = (props) => {
  return (
    <Paper component='form'>
      <form action="/api/users/login" method="post" noValidate autoComplete="off" name="login" encType="application/x-www-form-urlencoded">
        <TextField required id="outlined-basic" label="E-mail" /><br />
        <TextField required id="outlined-basic" type="password" label="Password" /><br />
        <Button onClick={props.clickHandler} variant="contained" color="primary">Login</Button>
      </form>
    </Paper>
  )
}

export default LoginForm