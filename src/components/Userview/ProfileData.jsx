import LayoutComponent from '../General/LayoutComponent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  //
}));

const ProfileData = (props) => {
  const classes = useStyles();

  const { user, ...rest } = props;

  return <LayoutComponent {...rest}></LayoutComponent>;
};

export default ProfileData;
