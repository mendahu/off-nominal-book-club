import LayoutComponent from '../../../components/General/LayoutComponent';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Box, Checkbox } from '@material-ui/core';
import patreonAuthUrlGenerator from '../../../helpers/patreon/authUrlGenerator';
import axios from 'axios';
import { useSnackbarContext } from '../../../contexts/SnackbarContext';
import sendPasswordReset from '../../../helpers/sendPasswordReset';
import { useUser } from '../../../../lib/user';
import { MailchimpSubscriberStatus } from '../../../types/api/apiTypes.d';

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

const ProfileData = ({ ...rest }) => {
  const classes = useStyles();

  const { user, resetUserPatreonState } = useUser();
  const [subscriberStatus, setSubscriberStatus] = useState(
    user.marketingStatus
  );
  const email = user && user.email;
  const triggerSnackbar = useSnackbarContext();
  const patreonConnected = user?.patreon.state === 'connected';

  const toggleCheckbox = async () => {
    if (subscriberStatus === MailchimpSubscriberStatus.unknown) {
      triggerSnackbar({
        active: true,
        message:
          'Current email subscription status is unknown. Please refresh the page and try again.',
        severity: 'error',
      });
      return;
    }

    const oldStatus = subscriberStatus;
    try {
      let message: string;
      if (subscriberStatus === MailchimpSubscriberStatus.notSubscribed) {
        setSubscriberStatus(MailchimpSubscriberStatus.subscribed);
        await axios.post('/api/marketing/users/new');
        message = 'You have successfully subcribed to the mailing list.';
      } else {
        const newStatus =
          oldStatus === MailchimpSubscriberStatus.subscribed
            ? MailchimpSubscriberStatus.unsubscribed
            : MailchimpSubscriberStatus.subscribed;

        setSubscriberStatus(newStatus);
        await axios.patch('/api/marketing/users/update', {
          subscriberStatus,
          newStatus,
        });
        message = 'You have successfully unsubcribed from the mailing list.';
      }

      triggerSnackbar({
        active: true,
        message,
        severity: 'success',
      });
    } catch (err) {
      setSubscriberStatus(oldStatus);
      triggerSnackbar({
        active: true,
        message: 'Error updating email preferences',
        severity: 'error',
      });
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
      resetUserPatreonState();
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
            checked={subscriberStatus === MailchimpSubscriberStatus.subscribed}
            onChange={toggleCheckbox}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <Typography paragraph component="p" variant="subtitle2">
            Send me very occasional updates about the Off-Nominal Book Club and
            other news from Jake via email
          </Typography>
        </div>
      </Box>
    </LayoutComponent>
  );
};

export default ProfileData;
