import { useState, useContext, useEffect } from "react";
import UserContext from "../UserContext";
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

  const [drawerOpen, setDrawerOpen] = useState(false);
  const { userId, logUserIn, logUserOut } = useContext(UserContext);

  const [isLoggedin, setIsLoggedIn] = useState(false);

  useEffect(() => setIsLoggedIn(userId), []);

  const logOut = () => {
    logUserOut();
    setIsLoggedIn(false);
    Router.push(window.location.pathname);
  };

  const logIn = userId => {
    logUserIn(userId);
    setIsLoggedIn(true);
    Router.push(window.location.pathname);
  };

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
        {userId && (
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
        <Link href={`/readings`} passHref>
          <ListItem button>
            <ListItemIcon>
              <LocalLibraryIcon />
            </ListItemIcon>
            <ListItemText primary={"View Readings"} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      {userId ? (
        <List>
          <Link href={`/users/[id]`} as={`/users/${userId}`} passHref>
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
          <ListItem button onClick={() => logIn(2)}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={"Log in Owner"} />
          </ListItem>
          <ListItem button onClick={() => logIn(1)}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={"Log in Moderator"} />
          </ListItem>
          <ListItem button onClick={() => logIn(3)}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={"Log in Member"} />
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

        {isLoggedin && (
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
