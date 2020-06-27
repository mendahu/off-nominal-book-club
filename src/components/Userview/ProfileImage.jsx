import { Avatar } from '@material-ui/core';
import { useEffect } from 'react';
import LayoutComponent from '../General/LayoutComponent';
import { makeStyles } from '@material-ui/core/styles';
import {
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
  form: {
    marginTop: theme.spacing(2),
  },
}));

const ProfileImage = ({
  name,
  gravatar_avatar_url,
  patreon_avatar_url,
  avatar_select,
  onClick,
  isPatron,
  isUserAuthorized,
  ...rest
}) => {
  const classes = useStyles();

  const { formData, handleFormChange, updateProfile } = useProfileUpdater({
    avatar_select,
  });

  const isGravatar = formData.avatar_select === 'gravatar';

  useEffect(() => {
    updateProfile();
  }, [formData]);

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
            onChange={handleFormChange}
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