import { AppBar, Toolbar } from "@material-ui/core";
import LoginForm from './Authentication/LoginForm'

const Navbar = props => {
  return (
    <AppBar position="static">
      <Toolbar>

        <LoginForm userId={props.userId} logUserIn={props.logUserIn} logUserOut={props.logUserOut} />
      </Toolbar>
      
    </AppBar>
  )
}

export default Navbar;