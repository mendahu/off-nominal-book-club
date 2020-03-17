import Navbar from '../../src/components/Navbar'

const Layout = props => {

  return (
    <div>
      <Navbar></Navbar>
      {props.children}
    </div>
  )
}

export default Layout