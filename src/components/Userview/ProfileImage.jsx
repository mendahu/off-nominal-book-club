import { Avatar } from '@material-ui/core';
import LayoutComponent from '../General/LayoutComponent';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '10vh',
    height: '10vh',
    margin: 'auto',
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const ProfileImage = (props) => {
  const classes = useStyles();

  const { name, avatar, newAvatarSelect, loggedIn, onClick, ...rest } = props;

  return (
    <LayoutComponent {...rest} fullHeight={true}>
      <Avatar className={classes.avatar} alt={name} src={avatar} />
      {loggedIn && (
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={onClick}
        >
          Switch Avatar to {newAvatarSelect}
        </Button>
      )}
    </LayoutComponent>
  );
};

export default ProfileImage;
