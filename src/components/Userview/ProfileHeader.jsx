import LayoutComponent from '../General/LayoutComponent';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: 'auto',
  },
}));

const ProfileHeader = (props) => {
  const classes = useStyles();

  const { user, ...rest } = props;

  return (
    <LayoutComponent {...rest} fullHeight={true}>
      <Typography variant="h3" component="h1" className={classes.title}>
        {user.name}
      </Typography>
      <Typography variant="body1" component="p">
        {user.bio}
      </Typography>
    </LayoutComponent>
  );
};

export default ProfileHeader;
