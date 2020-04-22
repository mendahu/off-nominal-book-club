import {
  List,
  Divider
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core/styles";
import DrawerItem from './DrawerItem'

const useStyles = makeStyles(theme => ({
  list: {
    width: 250
  }
}));

const DrawerContents = ({ user, logInUrl, logOutUrl, toggleDrawer }) => {

  console.log(logInUrl, logOutUrl)

  const classes = useStyles();

  return (
    <div
      className={classes.list}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}>
        <List>
          {user?.isPatron && 
          <DrawerItem url='/books/new' text='Add Book' icon={<LibraryAddIcon color='primary' />} />}
          <DrawerItem url='/' text='Home' icon={<PeopleIcon />} />
        </List>
        <Divider />
        <List>
          {user?.app_metadata ? (
            <>
              <DrawerItem url={`/users/${user.app_metadata.onbc_id}`} text='My Profile' icon={<PersonIcon />} />
              <DrawerItem url={logOutUrl} text='Log out' icon={<ExitToAppIcon />} />
            </>
            ) : (
              <DrawerItem url={logInUrl} text='Log in' icon={<PersonIcon />} />
          )}
        </List>
      </div>
  )
  
};

export default DrawerContents;