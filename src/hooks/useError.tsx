import { useState, SyntheticEvent } from 'react';
import { Color } from '@material-ui/lab';
import ErrorSnackbar from '../components/Utility/ErrorSnackbar';

interface Error {
  active: boolean;
  message: string;
  severity: Color;
}

const useError = () => {
  const [error, setError] = useState<Error>({
    active: false,
    message: '',
    severity: 'info',
  });

  const triggerError = (errorProp: Error) => {
    setError(errorProp);
  };

  const closeError = (event: SyntheticEvent<Element, Event>, reason?) => {
    if (reason === 'clickaway') return;
    setError({ ...error, active: false, message: '' });
  };

  return { error, triggerError, closeError };
};

export { ErrorSnackbar, useError };
