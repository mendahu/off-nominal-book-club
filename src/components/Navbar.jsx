import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Drawer,
  Button
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Router from "next/router";
import { useFetchUser } from '../../lib/user'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: theme.spacing(-2)
  },
  brand: {
    display: "flex",
    alignItems: "center"
  },
  brandText: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down(415)]: {
      display: "none"
    }
  },
  title: {
    flexGrow: 1
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: "none"
  },
  list: {
    width: 250
  }
}));

const Navbar = () => {

  const classes = useStyles();

  const { user, loading } = useFetchUser();
  const [drawerOpen, setDrawerOpen] = useState(false)

  const logOut = () => {
    Router.push('/api/auth0/logout')
  }

  const logIn = () => {
    Router.push('/api/auth0/login')
  }

  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const drawer = () => (
    <div
      className={classes.list}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}>
      <List>
        {user?.isPatron && (
          <Link href={`/books/new`} passHref>
            <ListItem button>
              <ListItemIcon>
                <LibraryAddIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary={"Add Book"} />
            </ListItem>
          </Link>
        )}
        <Link href={`/`} passHref>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      {user?.app_metadata ? (
        <List>
          <Link href={`/users/${user.app_metadata.onbc_id}`} passHref>
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={"My Profile"} />
            </ListItem>
          </Link>
          <ListItem button onClick={logOut}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem button onClick={logIn}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={"Log in"} />
          </ListItem>
        </List>
      )}
    </div>
  );

  return (
    <AppBar position='sticky'>
      <Toolbar>

        <Button onClick={toggleDrawer(true)} className={classes.menuButton}>
          <MenuIcon onClick={toggleDrawer(true)} />
        </Button>
        <Drawer anchor={"left"} open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawer()}
        </Drawer>

        <Typography variant='h6' className={classes.title}>
          <Link href='/' passHref>
            <Box className={classes.brand}>
              <img src='/favicons/favicon-96.png' width='24' alt='Off-Nominal Book Club Logo'/>
              <Typography component='span' className={classes.brandText}>
                Off-Nominal Book Club
              </Typography>
            </Box>
          </Link>
        </Typography>

        {user?.isPatron && (
          <Link href={`/books/new`} passHref>
            <Button
              component='a'
              variant='contained'
              startIcon={<LibraryAddIcon />}
              color='secondary'>
              Add a Book
            </Button>
          </Link>
        )}

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
