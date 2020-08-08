import { useState, SyntheticEvent } from 'react';
import { Color } from '@material-ui/lab';
import OnbcSnackbar from '../components/Utility/OnbcSnackbar';

export interface SnackbarContent {
  active: boolean;
  message: string;
  severity: Color;
}

const useSnackbar = () => {
  const [snackBarContent, triggerSnackbar] = useState<SnackbarContent>({
    active: false,
    message: '',
    severity: 'info',
  });

  const closeSnackbar = (event: SyntheticEvent<Element, Event>, reason?) => {
    if (reason === 'clickaway') return;
    triggerSnackbar({ ...snackBarContent, active: false, message: '' });
  };

  return { snackBarContent, triggerSnackbar, closeSnackbar };
};

export { OnbcSnackbar, useSnackbar };
