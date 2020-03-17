import { AppBar } from "@material-ui/core";
import LoginForm from './Authentication/LoginForm'

const Navbar = props => {
  return (
    <AppBar position="static">
      <LoginForm />
      
    </AppBar>
  )
}

export default Navbar;