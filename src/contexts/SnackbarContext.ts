import { useContext, createContext } from 'react';

export const useSnackbarContext = () => useContext(SnackbarContext);

const SnackbarContext = createContext(null);

export default SnackbarContext;
