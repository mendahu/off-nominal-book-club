import Navbar from '../../src/components/Navbar'
import { Container } from "@material-ui/core";

const Layout = props => {

  return (
    <Container maxWidth="lg" disableGutters="true">
      <Navbar></Navbar>
      <Container maxWidth={false}>
        {props.children}
      </Container>
    </Container>
  )
}

export default Layout