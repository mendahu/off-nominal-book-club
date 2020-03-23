import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from './Authentication/LoginForm'
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Link from 'next/link'

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.constrastText,
    margin: theme.spacing(0, 1)
  }
}))

const Navbar = () => {
  const classes = useStyles(); 

  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/">
          <Typography variant="h6" className={classes.title}>
            <a className={classes.link}><ImportContactsIcon /> Bookpeople</a>
          </Typography>
        </Link>
        <LoginForm/>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;