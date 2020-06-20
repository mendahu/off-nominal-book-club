import LayoutComponent from '../General/LayoutComponent';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Box } from '@material-ui/core';
import patreonAuthUrlGenerator from '../../helpers/patreon/authUrlGenerator';
import { usePasswordReset } from '../../hooks/usePasswordReset';

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

  const handlePasswordReset = async () => {
    const result = await sendPasswordReset();
    alert(result);
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
            href={'/'}
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
      </Box>
    </LayoutComponent>
  );
};

export default ProfileData;
