import Navbar from '../../src/components/Navbar'
import { Container } from "@material-ui/core";

const Layout = props => {

  return (
    <Container maxWidth="lg" disableGutters="true">
      <Navbar></Navbar>
      {props.children}
    </Container>
  )
}

export default Layout