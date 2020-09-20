import LayoutComponent from '../General/LayoutComponent';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Box, Checkbox } from '@material-ui/core';
import patreonAuthUrlGenerator from '../../helpers/patreon/authUrlGenerator';
import axios from 'axios';
import { useProfileUpdater } from '../../hooks/useProfileUpdater';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import sendPasswordReset from '../../helpers/sendPasswordReset';

const useStyles = makeStyles((theme) => ({
  patreonMark: {
    width: '20px',
    height: '20px',
    marginRight: theme.spacing(1),
  },
  topContainer: {
    textAlign: 'center',
  },
  container: {
    marginTop: theme.spacing(4),
    textAlign: 'center',
  },
  emailContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

export type ProfileDataProps = {
  patreonState: string;
  email: string;
  getsMail: boolean;
};

const ProfileData = ({
  patreonState,
  email,
  getsMail,
  ...rest
}: ProfileDataProps) => {
  const classes = useStyles();

  const [patreonConnected, setPatreonConnected] = useState(
    patreonState === 'connected'
  );
  const triggerSnackbar = useSnackbarContext();
  const { formData, handleFormChange } = useProfileUpdater({
    gets_mail: getsMail,
  });

  const toggleCheckbox = (e) => {
    if (email) {
      handleFormChange(e, { update: true })
        .then(() => {
          triggerSnackbar({
            active: true,
            message: 'Email preference toggled!',
            severity: 'success',
          });
        })
        .catch(() => {
          triggerSnackbar({
            active: true,
            message: 'Error updating email preferences',
            severity: 'error',
          });
        });
    } else {
      handleFormChange(e);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordReset(email);
      triggerSnackbar({
        active: true,
        message: 'Password Reset Email Sent!',
        severity: 'success',
      });
    } catch (err) {
      triggerSnackbar({
        active: true,
        message: 'Something went wrong!',
        severity: 'error',
      });
    }
  };

  const disconnectPatreon = async () => {
    try {
      await axios.post('/api/auth0/update', { result: 'skipped' });
      setPatreonConnected(false);
      triggerSnackbar({
        active: true,
        message: 'Patreon Account Disconnected!',
        severity: 'success',
      });
    } catch (err) {
      triggerSnackbar({
        active: true,
        message: 'Something went wrong!',
        severity: 'error',
      });
    }
  };

  return (
    <LayoutComponent {...rest}>
      <Box className={classes.topContainer}>
        <Typography paragraph component="h2" variant="h5">
          Patreon
        </Typography>
        {patreonConnected ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={disconnectPatreon}
            startIcon={
              <img
                className={classes.patreonMark}
                src="/Patreon_Mark_Primary.png"
              />
            }
          >
            Disconnect
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            startIcon={
              <img
                className={classes.patreonMark}
                src="/Patreon_Mark_Primary.png"
              />
            }
            href={patreonAuthUrlGenerator()}
          >
            Connect
          </Button>
        )}
      </Box>
      <Box className={classes.container}>
        <Typography paragraph component="h2" variant="h5">
          Password
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePasswordReset}
        >
          Send Password Reset Email
        </Button>
      </Box>
      <Box className={classes.container}>
        <Typography paragraph component="h2" variant="h5">
          Email Preferences
        </Typography>
        <div className={classes.emailContainer}>
          <Checkbox
            id="gets_mail"
            checked={formData.gets_mail}
            onChange={(e) => toggleCheckbox(e)}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <Typography paragraph component="p" variant="subtitle2">
            Send me occasional updates about the Off-Nominal Book Club via email
          </Typography>
        </div>
      </Box>
    </LayoutComponent>
  );
};

export default ProfileData;
