import { Avatar } from '@material-ui/core';
import LayoutComponent from '../General/LayoutComponent';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { useProfileUpdater } from '../../hooks/useProfileUpdater';

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

const ProfileImage = ({
  name,
  gravatar_avatar_url,
  patreon_avatar_url,
  avatar_select,
  loggedIn,
  onClick,
  ...rest
}) => {
  const classes = useStyles();

  const { formData, handleFormChange, updateProfile } = useProfileUpdater({
    avatar_select,
  });

  const isGravatar = formData.avatar_select === 'gravatar';
  const newAvatarSelect = isGravatar ? 'patreon' : 'gravatar';

  const toggleAvatar = (e) => {
    handleFormChange(e);
    updateProfile();
  };

  return (
    <LayoutComponent {...rest} fullHeight={true}>
      <Avatar
        className={classes.avatar}
        alt={name}
        src={isGravatar ? gravatar_avatar_url : patreon_avatar_url}
      />
      {loggedIn && (
        <FormControl>
          <RadioGroup
            aria-label="avatar"
            name="avatar_select"
            value={formData.avatar_select}
            onChange={toggleAvatar}
          >
            <FormControlLabel
              control={<Radio />}
              value="gravatar"
              label="Use Gravatar"
            />
            <FormControlLabel
              control={<Radio />}
              value="patreon"
              label="Use Patreon Avatar"
            />
          </RadioGroup>
        </FormControl>
      )}
    </LayoutComponent>
  );
};

export default ProfileImage;
