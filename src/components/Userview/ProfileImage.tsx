import { Avatar } from '@material-ui/core';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import LayoutComponent from '../General/LayoutComponent';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { useUser } from '../../../lib/user';
import { useProfileUpdater } from '../../hooks/useProfileUpdater/useProfileUpdater';
import { AvatarSelect } from '../../types/enums';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '10vh',
    height: '10vh',
    margin: 'auto',
  },
  button: {
    marginTop: theme.spacing(2),
  },
  form: {
    marginTop: theme.spacing(2),
  },
}));

export type ProfileImageProps = {
  name: string;
  gravatar_avatar_url: string;
  patreon_avatar_url: string;
  avatar_select: AvatarSelect;
  isUserAuthorized: boolean;
};

const ProfileImage = ({
  name,
  gravatar_avatar_url,
  patreon_avatar_url,
  avatar_select,
  isUserAuthorized,
  ...rest
}: ProfileImageProps) => {
  const classes = useStyles();

  const { user } = useUser();
  const isPatron = user && user.isPatron;

  const triggerSnackbar = useSnackbarContext();
  const { formData, handleFormChange } = useProfileUpdater({
    avatar_select,
  });

  const isGravatar = formData.avatar_select === 'gravatar';

  const toggleProfilePicture = (e) => {
    if (isUserAuthorized) {
      handleFormChange(e, { update: true })
        .then(() => {
          triggerSnackbar({
            active: true,
            message: 'Profile Picture updated',
            severity: 'success',
          });
        })
        .catch(() => {
          triggerSnackbar({
            active: true,
            message: 'Error updating profile picture',
            severity: 'error',
          });
        });
    }
  };

  return (
    <LayoutComponent {...rest} fullHeight={true}>
      <Avatar
        className={classes.avatar}
        alt={name}
        src={isGravatar ? gravatar_avatar_url : patreon_avatar_url}
      />
      {isPatron && isUserAuthorized && (
        <FormControl className={classes.form}>
          <RadioGroup
            aria-label="avatar"
            name="avatar_select"
            value={formData.avatar_select}
            onChange={(e) => toggleProfilePicture(e)}
          >
            <FormControlLabel
              control={<Radio />}
              value="gravatar"
              label="Use Gravatar"
            />
            <FormControlLabel
              control={<Radio />}
              value="patreon"
              label="Use Patreon"
            />
          </RadioGroup>
        </FormControl>
      )}
    </LayoutComponent>
  );
};

export default ProfileImage;
