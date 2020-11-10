import Navbar from './Navbar/Navbar'
import { Container } from "@material-ui/core";

const Layout = props => {

  return (
    <Container maxWidth="lg" disableGutters={true}>
      <Navbar></Navbar>
      <Container component="main" maxWidth={false}>
        {props.children}
      </Container>
    </Container>
  )
}

export default Layout