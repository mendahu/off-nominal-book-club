import { useContext, useState } from 'react'
import { 
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import AccountCircle from '@material-ui/icons/AccountCircle';
import UserContext from '../../UserContext'
import Router from 'next/router'


const LoginForm = () => {

  const { userId, logUserIn, logUserOut } = useContext(UserContext)
  const [ anchorEl, setAnchorEl ] = useState(null)
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const clickProfile = () => {
    handleClose();
    Router.push(`/users/${userId}`);
  }

  const logOut = () => {
    handleClose();
    logUserOut();
    Router.push(window.location.pathname)
  }
  
  const logIn = (userId) => {
    handleClose();
    logUserIn(userId)
    Router.push(window.location.pathname)
  }

  return (
    <div>
      <IconButton
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        {userId && <MenuItem onClick={clickProfile}>Profile</MenuItem>}
        {userId && <MenuItem onClick={logOut}>Logout</MenuItem>}
        {!userId && <MenuItem onClick={() => logIn(2)}>Login Owner</MenuItem>}
        {!userId && <MenuItem onClick={() => logIn(1)}>Login Moderator</MenuItem>}
        {!userId && <MenuItem onClick={() => logIn(3)}>Login Member</MenuItem>}
      </Menu>
    </div>
  )
}

export default LoginForm