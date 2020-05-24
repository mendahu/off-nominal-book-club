import LayoutComponent from '../General/LayoutComponent';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  //
}));

const ProfileData = (props) => {
  const classes = useStyles();

  const { user, ...rest } = props;

  return (
    <LayoutComponent {...rest}>
      <Typography>Connect Patreon</Typography>
      <Typography>Change Password</Typography>
    </LayoutComponent>
  );
};

export default ProfileData;
