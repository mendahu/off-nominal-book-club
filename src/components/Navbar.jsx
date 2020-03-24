import { AppBar, Toolbar, Typography } from "@material-ui/core";
import AccountMenu from './Authentication/AccountMenu'
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';

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
  }
}));

const Navbar = () => { 
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href="/">
              <a className={classes.link}><ImportContactsIcon /> Bookpeople</a>
            </Link>
          </Typography>
          <AccountMenu/>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar;