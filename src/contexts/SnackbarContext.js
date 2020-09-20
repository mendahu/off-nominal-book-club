import { useContext, createContext } from 'react';

export const useSnackbarContext = () => useContext(SnackbarContext);

const SnackbarContext = createContext({});

export default SnackbarContext;
