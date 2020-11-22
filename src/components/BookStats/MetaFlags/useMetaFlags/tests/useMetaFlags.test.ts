import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import { Flag, MetaFlagData } from '../../MetaFlags';
import { useMetaFlags } from '../useMetaFlags';
jest.mock('axios');

const mockTriggerSnackBar = jest.fn();

describe('useMetaFlags', () => {
  const defaultMetaDataProp: MetaFlagData = {
    reads: {
      count: 5,
      id: 1,
      loading: false,
    },
    wishlist: {
      count: 4,
      loading: false,
    },
    favourites: {
      count: 2,
      id: 4,
      loading: false,
    },
  };

  beforeEach(() => {
    mockTriggerSnackBar.mockClear();
  });

  it('should return correct state', () => {
    const { result } = renderHook(() =>
      useMetaFlags(defaultMetaDataProp, 5, 12, mockTriggerSnackBar)
    );

    expect(result.current.reads).toEqual(defaultMetaDataProp.reads);
    expect(result.current.wishlist).toEqual(defaultMetaDataProp.wishlist);
    expect(result.current.favourites).toEqual(defaultMetaDataProp.favourites);
  });

  it('should trigger user Error if not signed in', () => {
    const { result } = renderHook(() =>
      useMetaFlags(defaultMetaDataProp, 5, undefined, mockTriggerSnackBar)
    );

    act(() => {
      result.current.clickHandler(Flag.reads)();
    });

    expect(result.current.reads).toEqual(defaultMetaDataProp.reads);
    expect(mockTriggerSnackBar).toHaveBeenCalledTimes(1);
  });

  it('should do nothing if incorrect flag type passed', () => {
    const { result } = renderHook(() =>
      useMetaFlags(defaultMetaDataProp, 5, 12, mockTriggerSnackBar)
    );

    act(() => {
      result.current.clickHandler('banana')();
    });

    expect(result.current.reads).toEqual(defaultMetaDataProp.reads);
  });

  it('should do nothing if clicked while loading', () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useMetaFlags(
        {
          ...defaultMetaDataProp,
          reads: {
            count: 5,
            id: 1,
            loading: true,
          },
        },
        5,
        12,
        mockTriggerSnackBar
      )
    );

    expect(result.current.reads.loading).toBeTruthy();

    act(() => {
      result.current.clickHandler(Flag.reads)();
    });

    expect(result.current.reads.loading).toBeTruthy();

    expect(result.current.reads).toEqual({
      count: 5,
      id: 1,
      loading: true,
    });
  });

  it('should unmark active flag when clicked', async () => {
    axios.post.mockResolvedValueOnce({ success: true });
    const { result, waitForNextUpdate } = renderHook(() =>
      useMetaFlags(defaultMetaDataProp, 5, 12, mockTriggerSnackBar)
    );

    act(() => {
      result.current.clickHandler(Flag.reads)();
    });

    expect(result.current.reads.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.reads).toEqual({
      count: 4,
      loading: false,
    });
  });

  it('should unmark active favourites flag when clicked', async () => {
    axios.post.mockResolvedValueOnce({ success: true });
    const { result, waitForNextUpdate } = renderHook(() =>
      useMetaFlags(defaultMetaDataProp, 5, 12, mockTriggerSnackBar)
    );

    act(() => {
      result.current.clickHandler(Flag.favourites)();
    });

    expect(result.current.favourites.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.favourites).toEqual({
      count: 1,
      loading: false,
    });
  });

  it('should mark inactive flag when clicked', async () => {
    axios.post.mockResolvedValueOnce({ data: [9] });
    const { result, waitForNextUpdate } = renderHook(() =>
      useMetaFlags(defaultMetaDataProp, 5, 12, mockTriggerSnackBar)
    );

    act(() => {
      result.current.clickHandler(Flag.wishlist)();
    });

    expect(result.current.wishlist.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.wishlist).toEqual({
      count: 5,
      loading: false,
      id: 9,
    });
  });

  it('should trigger error snackbar when marking as inactive but API fails', async () => {
    axios.post.mockRejectedValueOnce({ success: false });
    const { result, waitForNextUpdate } = renderHook(() =>
      useMetaFlags(defaultMetaDataProp, 5, 12, mockTriggerSnackBar)
    );

    act(() => {
      result.current.clickHandler(Flag.reads)();
    });

    expect(result.current.reads.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.reads).toEqual(defaultMetaDataProp.reads);
    expect(mockTriggerSnackBar).toHaveBeenCalledTimes(1);
  });

  it('should trigger error snackbar when unmarking as active but API fails', async () => {
    axios.post.mockRejectedValueOnce('womp');
    const { result, waitForNextUpdate } = renderHook(() =>
      useMetaFlags(defaultMetaDataProp, 5, 12, mockTriggerSnackBar)
    );

    act(() => {
      result.current.clickHandler(Flag.wishlist)();
    });

    expect(result.current.wishlist.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.wishlist).toEqual(defaultMetaDataProp.wishlist);
  });
});
