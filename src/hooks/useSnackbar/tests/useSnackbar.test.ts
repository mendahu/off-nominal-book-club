import { renderHook, act } from '@testing-library/react-hooks';
import { SyntheticEvent } from 'react';
import { SnackbarContent, useSnackbar } from '../useSnackbar';

describe('useSnackbar', () => {
  const defaultState: SnackbarContent = {
    active: false,
    message: '',
    severity: 'info',
  };

  const warningState: SnackbarContent = {
    active: true,
    message: 'an error',
    severity: 'warning',
  };

  it('should render initial state', () => {
    const { result } = renderHook(() => useSnackbar());

    expect(result.current.snackBarContent).toEqual(defaultState);
  });

  it('should render change to an active snackbar when triggered', () => {
    const { result } = renderHook(() => useSnackbar());

    expect(result.current.snackBarContent).toEqual(defaultState);

    act(() => {
      result.current.triggerSnackbar(warningState);
    });

    expect(result.current.snackBarContent).toEqual(warningState);
  });

  it('should return default state when closed', () => {
    const { result } = renderHook(() => useSnackbar());

    expect(result.current.snackBarContent).toEqual(defaultState);

    act(() => {
      result.current.triggerSnackbar(warningState);
    });

    expect(result.current.snackBarContent).toEqual(warningState);

    act(() => {
      result.current.closeSnackbar({} as SyntheticEvent);
    });

    expect(result.current.snackBarContent).toEqual({
      ...warningState,
      active: false,
      message: '',
    });
  });

  it('should return just return if close reason is clickaway', () => {
    const { result } = renderHook(() => useSnackbar());

    expect(result.current.snackBarContent).toEqual(defaultState);

    act(() => {
      result.current.triggerSnackbar(warningState);
    });

    expect(result.current.snackBarContent).toEqual(warningState);

    act(() => {
      result.current.closeSnackbar({} as SyntheticEvent, 'clickaway');
    });

    expect(result.current.snackBarContent).toEqual(warningState);
  });
});
