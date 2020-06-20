import LayoutComponent from '../General/LayoutComponent';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Box } from '@material-ui/core';
import patreonAuthUrlGenerator from '../../helpers/patreon/authUrlGenerator';
import { usePasswordReset } from '../../hooks/usePasswordReset';
import { useSnackbar, OnbcSnackbar } from '../../hooks/useSnackbar';

const useStyles = makeStyles((theme) => ({
  patreonMark: {
    width: '20px',
    marginRight: theme.spacing(1),
  },
  patreonContainer: {
    textAlign: 'center',
  },
  passwordContainer: {
    marginTop: theme.spacing(4),
    textAlign: 'center',
  },
}));

const ProfileData = ({ patreonState, email, ...rest }) => {
  const classes = useStyles();

  const { sendPasswordReset } = usePasswordReset(email);
  const { snackBarContent, triggerSnackbar, closeSnackbar } = useSnackbar();

  const handlePasswordReset = async () => {
    try {
      await sendPasswordReset();
    } catch (err) {
      triggerSnackbar({
        active: true,
        message: 'Something went wrong!',
        severity: 'error',
      });
    }
    triggerSnackbar({
      active: true,
      message: 'Password Email Sent!',
      severity: 'success',
    });
  };

  const disconnectPatreon = () => {
    //
  };

  return (
    <LayoutComponent {...rest}>
      <Box className={classes.patreonContainer}>
        <Typography paragraph component="h2" variant="h5">
          Patreon
        </Typography>
        {patreonState === 'connected' ? (
          <Button
            className={classes.button}
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
            className={classes.button}
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
      <Box className={classes.passwordContainer}>
        <Typography paragraph component="h2" variant="h5">
          Password
        </Typography>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handlePasswordReset}
        >
          Send Password Reset Email
        </Button>
        <OnbcSnackbar content={snackBarContent} closeSnackbar={closeSnackbar} />
      </Box>
    </LayoutComponent>
  );
};

export default ProfileData;
