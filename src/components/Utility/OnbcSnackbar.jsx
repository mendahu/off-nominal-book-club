import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const OnbcSnackbar = ({ content, closeSnackbar }) => {
  const { active, message, severity } = content;

  return (
    <Snackbar open={active} autoHideDuration={6000} onClose={closeSnackbar}>
      <Alert onClose={closeSnackbar} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default OnbcSnackbar;
