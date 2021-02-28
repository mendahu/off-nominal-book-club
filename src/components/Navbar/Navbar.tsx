import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import Link from "next/link";
import { Link as MatLink } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DrawerContents from "./Drawer/DrawerContents";
import { useBookClubUser } from "../../../lib/bookClubUser";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginLeft: theme.spacing(-2),
  },
  brand: {
    display: "flex",
    alignItems: "center",
  },
  brandText: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down(415)]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
  },
}));

export const keyDownGate = (callback) => (open: boolean) => (event) => {
  if (
    event.type === "keydown" &&
    (event.key === "Tab" || event.key === "Shift")
  ) {
    return;
  }

  callback(open);
};

const Navbar = () => {
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, loading } = useBookClubUser();

  const toggleDrawer = keyDownGate(setDrawerOpen);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button onClick={toggleDrawer(true)} className={classes.menuButton}>
          <MenuIcon onClick={toggleDrawer(true)} />
        </Button>
        <Drawer anchor={"left"} open={drawerOpen} onClose={toggleDrawer(false)}>
          <DrawerContents
            logInUrl="/api/auth/login"
            logOutUrl="/api/auth/logout"
            toggleDrawer={toggleDrawer}
          />
        </Drawer>

        <Typography variant="h6" className={classes.title}>
          <Link href="/" passHref>
            <MatLink color="inherit" underline="none">
              <Box className={classes.brand}>
                <img
                  src="/favicons/favicon-96.png"
                  width="24"
                  alt="Off-Nominal Book Club Logo"
                />
                <Typography component="span" className={classes.brandText}>
                  Off-Nominal Book Club
                </Typography>
              </Box>
            </MatLink>
          </Link>
        </Typography>

        {user?.isPatron && (
          <Link href={`/books/new`} passHref>
            <Button
              component="a"
              variant="contained"
              startIcon={<LibraryAddIcon />}
              color="secondary"
            >
              Add a Book
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
