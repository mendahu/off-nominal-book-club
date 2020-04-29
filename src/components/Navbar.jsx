import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  Button
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import Link from "next/link";
import { Link as MatLink } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import { useFetchUser } from '../../lib/user'
import DrawerContents from './Navbar/DrawerContents'

const useStyles = makeStyles(theme => ({
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
  }
}));

const Navbar = () => {

  const classes = useStyles();

  const { user, loading } = useFetchUser();
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  return (
    <AppBar position='sticky'>
      <Toolbar>

        <Button onClick={toggleDrawer(true)} className={classes.menuButton}>
          <MenuIcon onClick={toggleDrawer(true)} />
        </Button>
        <Drawer anchor={"left"} open={drawerOpen} onClose={toggleDrawer(false)}>
          <DrawerContents 
            user={user}
            logInUrl='/api/auth0/login'
            logOutUrl='/api/auth0/logout'
            toggleDrawer={toggleDrawer} />
        </Drawer>

        <Typography variant='h6' className={classes.title}>
          <Link href='/' passHref>
          <MatLink color="inherit" underline="none">
            <Box className={classes.brand}>
              <img src='/favicons/favicon-96.png' width='24' alt='Off-Nominal Book Club Logo'/>
              <Typography component='span' className={classes.brandText}>
                Off-Nominal Book Club
              </Typography>
            </Box>
            </MatLink>
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
