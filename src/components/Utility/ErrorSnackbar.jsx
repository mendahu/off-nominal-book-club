import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const ErrorSnackbar = ({ error, closeError }) => {
  const { active, message, severity } = error;

  return (
    <Snackbar open={active} autoHideDuration={6000} onClose={closeError}>
      <Alert onClose={closeError} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
