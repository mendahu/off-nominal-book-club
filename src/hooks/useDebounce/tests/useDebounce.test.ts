import { renderHook, act } from '@testing-library/react-hooks';
import { useDebounce } from '../useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('it should render initial value', () => {
    const { result } = renderHook(() => useDebounce('banana', 500));
    expect(result.current).toEqual('banana');
  });

  it('it should not render new value yet', () => {
    let initialValue = 'banana';
    const { result, rerender } = renderHook(() =>
      useDebounce(initialValue, 500)
    );
    expect(result.current).toEqual('banana');
    initialValue = 'apple';
    rerender();
    expect(result.current).toEqual('banana');
  });

  it('it should render new value after timer', () => {
    let initialValue = 'banana';
    const { result, rerender } = renderHook(() =>
      useDebounce(initialValue, 500)
    );
    expect(result.current).toEqual('banana');
    initialValue = 'apple';
    rerender();
    expect(result.current).toEqual('banana');
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current).toEqual('apple');
  });
});
