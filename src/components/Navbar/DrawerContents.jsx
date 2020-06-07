import {
  List,
  Divider,
  Typography,
  Link as MatLink,
  Avatar,
} from '@material-ui/core';

//Material Icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import DrawerItem from './DrawerItem';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  bulletList: {
    paddingInlineStart: 0,
  },
  avatar: {
    width: '10vh',
    height: '10vh',
    margin: '1em auto 1em auto',
  },
}));

const DrawerContents = ({ user, logInUrl, logOutUrl, toggleDrawer }) => {
  const classes = useStyles();

  const profileLink = `/users/${user?.onbc_id}`;

  const profileItems = [
    { display: 'READS', query: 'reads' },
    { display: 'FAVOURITES', query: 'favourites' },
    { display: 'WISHLIST', query: 'wishlist' },
  ];

  return (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {user?.onbc_id && (
        <>
          <Link href={profileLink} passHref>
            <MatLink color="inherit" underline="none">
              <Avatar
                className={classes.avatar}
                src={user.avatar}
                alt={`Avatar for ${user.name}`}
              />
            </MatLink>
          </Link>
          <Link href={profileLink} passHref>
            <MatLink color="inherit" underline="none">
              <Typography align="center" variant="h5" component="h1">
                {user.name}
              </Typography>
            </MatLink>
          </Link>
          <ul className={classes.bulletList}>
            {profileItems.map((item, index) => (
              <Link href={profileLink} passHref key={index}>
                <MatLink color="inherit" underline="none">
                  <Typography align="center" variant="overline" component="li">
                    {item.display}: {user[item.query].length}
                  </Typography>
                </MatLink>
              </Link>
            ))}
          </ul>
          <Divider />
        </>
      )}

      {user?.isPatron && (
        <>
          <List>
            <DrawerItem
              url="/books/new"
              text="Add Book"
              icon={<LibraryAddIcon color="primary" />}
            />
          </List>
          <Divider />
        </>
      )}

      <List>
        <DrawerItem url="/about" text="About" icon={<ContactSupportIcon />} />
        {user?.onbc_id ? (
          <DrawerItem url={logOutUrl} text="Log out" icon={<ExitToAppIcon />} />
        ) : (
          <DrawerItem url={logInUrl} text="Log in" icon={<PersonIcon />} />
        )}
      </List>
    </div>
  );
};

export default DrawerContents;
