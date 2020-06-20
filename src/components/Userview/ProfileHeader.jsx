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

  const { name, bio, ...rest } = props;

  return (
    <LayoutComponent {...rest} flexbox="col" fullHeight={true}>
      <Typography variant="h3" component="h1" className={classes.title}>
        {name}
      </Typography>
      <Typography variant="body1" component="p">
        {bio}
      </Typography>
    </LayoutComponent>
  );
};

export default ProfileHeader;
