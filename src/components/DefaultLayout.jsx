import Navbar from '../../src/components/Navbar'
import { Container } from "@material-ui/core";
import useCookie from '../hooks/useCookie'

const Layout = props => {

  const { userId, logUserIn, logUserOut } = useCookie(null)

  return (
    <Container maxWidth="lg">
      <Navbar userId={userId} logUserIn={logUserIn} logUserOut={logUserOut}></Navbar>
      {props.children}
    </Container>
  )
}

export default Layout