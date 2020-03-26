import { 
  AppBar, 
  Toolbar, 
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  Button } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import Link from 'next/link'
import { useState, useContext } from 'react'
import UserContext from '../UserContext'
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  },
  list: {
    width: 250,
  },
}));

const Navbar = () => { 
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const { userId, logUserIn, logUserOut } = useContext(UserContext)

  const logOut = () => {
    logUserOut();
    Router.push(window.location.pathname)
  }
  
  const logIn = (userId) => {
    logUserIn(userId)
    Router.push(window.location.pathname)
  }

  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerOpen(open);
  };

  const drawer = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Link href={`/books/new`} passHref>
          <ListItem button>
            <ListItemIcon><LibraryAddIcon color='primary'/></ListItemIcon>
            <ListItemText primary={'Add Book'} />
          </ListItem>
        </Link>
        <Link href={`/community`} passHref>
          <ListItem button>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary={'Community'} />
          </ListItem>
        </Link>
        <Link href={`/readings`} passHref>
          <ListItem button>
            <ListItemIcon><LocalLibraryIcon /></ListItemIcon>
            <ListItemText primary={'View Readings'} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      {userId 
        ? <List>
            <Link href={`/users/${userId}`} passHref>
              <ListItem button>
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary={'My Profile'} />
              </ListItem>
            </Link>
            <ListItem button onClick={logOut}>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItem>
          </List>
        : <List>
            <ListItem button onClick={() => logIn(2)}>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary={'Log in Owner'} />
            </ListItem>
            <ListItem button onClick={() => logIn(1)}>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary={'Log in Moderator'} />
            </ListItem>
            <ListItem button onClick={() => logIn(3)}>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary={'Log in Member'} />
            </ListItem>
          </List>
      }
      
    </div>
  )

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon />
        </Button>
        <Drawer anchor={'left'} open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawer()}
        </Drawer>
        <Typography variant="h6" className={classes.title}>
          <Link href="/">
            <a className={classes.link}><ImportContactsIcon /> Bookpeople</a>
          </Link>
        </Typography>
        <Link href={`/books/new`} passHref>
          <Button 
            component='a' 
            variant='contained'
            startIcon={<LibraryAddIcon />} 
            color='secondary'>Add a Book</Button>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;