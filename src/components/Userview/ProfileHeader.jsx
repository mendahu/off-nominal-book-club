import LayoutComponent from '../General/LayoutComponent';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  //
}));

const ProfileHeader = (props) => {
  const classes = useStyles();

  const { user, ...rest } = props;

  return (
    <LayoutComponent {...rest}>
      <Typography>{user.name}</Typography>
      <Typography>{user.bio}</Typography>
    </LayoutComponent>
  );
};

export default ProfileHeader;
