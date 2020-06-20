import { useState, SyntheticEvent } from 'react';
import { Color } from '@material-ui/lab';
import OnbcSnackbar from '../components/Utility/OnbcSnackbar';

interface SnackbarContent {
  active: boolean;
  message: string;
  severity: Color;
}

const useSnackbar = () => {
  const [snackBarContent, setMessage] = useState<SnackbarContent>({
    active: false,
    message: '',
    severity: 'info',
  });

  const triggerSnackbar = (messageProp: SnackbarContent) => {
    setMessage(messageProp);
  };

  const closeSnackbar = (event: SyntheticEvent<Element, Event>, reason?) => {
    if (reason === 'clickaway') return;
    setMessage({ ...snackBarContent, active: false, message: '' });
  };

  return { snackBarContent, triggerSnackbar, closeSnackbar };
};

export { OnbcSnackbar, useSnackbar };
