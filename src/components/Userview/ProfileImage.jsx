import { Avatar } from '@material-ui/core';
import LayoutComponent from '../General/LayoutComponent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '10vh',
    height: '10vh',
    margin: 'auto',
  },
}));

const ProfileImage = (props) => {
  const classes = useStyles();

  const { user, ...rest } = props;

  return (
    <LayoutComponent {...rest} fullHeight={true}>
      <Avatar
        className={classes.avatar}
        alt={user.name}
        src={
          user.avatar_select === 'gravatar'
            ? user.gravatar_avatar_url
            : user.patreon_avatar_url
        }
      />
    </LayoutComponent>
  );
};

export default ProfileImage;
