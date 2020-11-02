import { useState, SyntheticEvent } from 'react';
import { Color } from '@material-ui/lab';
import OnbcSnackbar from '../../components/Utility/OnbcSnackbar';

export interface SnackbarContent {
  active: boolean;
  message: string;
  severity: Color;
}

const useSnackbar = () => {
  const [snackBarContent, setSnackbarContent] = useState<SnackbarContent>({
    active: false,
    message: '',
    severity: 'info',
  });

  const triggerSnackbar = (payload: SnackbarContent) => {
    setSnackbarContent(payload);
  };

  const closeSnackbar = (event: SyntheticEvent<Element, Event>, reason?) => {
    if (reason === 'clickaway') return;
    setSnackbarContent({ ...snackBarContent, active: false, message: '' });
  };

  return { snackBarContent, triggerSnackbar, closeSnackbar };
};

export { OnbcSnackbar, useSnackbar };
