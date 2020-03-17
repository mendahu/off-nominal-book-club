import { AppBar, Toolbar } from "@material-ui/core";
import LoginForm from './Authentication/LoginForm'

const Navbar = props => {
  return (
    <AppBar position="static">
      <Toolbar>

        <LoginForm />
      </Toolbar>
      
    </AppBar>
  )
}

export default Navbar;