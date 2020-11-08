import { useTags } from '../useTags';
import { renderHook, act } from '@testing-library/react-hooks';
import { JoinedTag } from '../../../types/common';
import axios from 'axios';
import { AutocompleteTag } from '../../../types/apiTypes';
import React from 'react';
import { BookTagActionType } from '../../../reducers/bookTagReducer/bookTagReducer';
jest.mock('axios');
jest.spyOn(React, 'useReducer');

const mockDispatch = jest.fn();
React.useReducer.mockImplementation((reducer, state) => {
  return [state, mockDispatch];
});

describe('useTags', () => {
  let initialState: JoinedTag[];
  let tagList: AutocompleteTag[];

  beforeEach(() => {
    initialState = [
      {
        tag_name: 'space',
        count: 1,
        tag_id: 1,
        loading: false,
        tagRelId: 1,
      },
      {
        tag_name: 'mars',
        count: 3,
        tag_id: 2,
        loading: false,
      },
    ];

    tagList = [
      {
        id: 1,
        count: 1,
        label: 'space',
      },
      {
        id: 2,
        count: 3,
        label: 'mars',
      },
    ];

    axios.get.mockResolvedValue({ data: tagList });

    mockDispatch.mockClear();
  });

  it('should be render initial value', () => {
    const { result } = renderHook(() => useTags(initialState, 1));
    expect(result.current.state).toEqual(initialState);
  });

  it('should return tagList', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useTags(initialState, 1)
    );
    await waitForNextUpdate();
    expect(result.current.tagList).toEqual(tagList);
  });

  it('should add a Tag that is not already on the list', async () => {
    axios.post
      .mockResolvedValueOnce({ data: { id: 3 } })
      .mockResolvedValueOnce({ data: [2] });

    const { result, waitForNextUpdate } = renderHook(() =>
      useTags(initialState, 1)
    );

    await waitForNextUpdate(); // lets useEffect populate taglist

    act(() => {
      result.current.addTag('rockets', 2);
    });

    await waitForNextUpdate();

    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: BookTagActionType.ADD_TAG,
      payload: {
        tagName: 'rockets',
        tagId: 3,
        tagRelId: 2,
      },
    });

    expect(mockDispatch.mock.calls[1][0]).toEqual({
      type: BookTagActionType.COMPLETE_PROCESSING,
      payload: {
        tagId: 3,
      },
    });

    expect(result.current.tagList).toEqual([
      ...tagList,
      { id: 3, count: 1, label: 'rockets' },
    ]);
  });

  it('should add a Tag that is already on the list', async () => {
    axios.post
      .mockResolvedValueOnce({ data: { id: 2 } })
      .mockResolvedValueOnce({ data: [2] });

    const { result, waitForNextUpdate } = renderHook(() =>
      useTags(initialState, 1)
    );

    await waitForNextUpdate();

    act(() => {
      result.current.addTag('mars', 2);
    });

    await waitForNextUpdate();

    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: BookTagActionType.INCREMENT_TAG,
      payload: {
        tagId: 2,
        tagRelId: 2,
      },
    });

    expect(mockDispatch.mock.calls[1][0]).toEqual({
      type: BookTagActionType.COMPLETE_PROCESSING,
      payload: {
        tagId: 2,
      },
    });

    expect(result.current.tagList).toEqual([
      {
        id: 1,
        count: 1,
        label: 'space',
      },
      {
        id: 2,
        count: 4,
        label: 'mars',
      },
    ]);
  });

  it('should not increment a tag if it is loading', async () => {
    initialState[0].loading = true;

    const { result, waitForNextUpdate } = renderHook(() =>
      useTags(initialState, 1)
    );

    await waitForNextUpdate();

    act(() => {
      result.current.incrementTag(initialState[0], 2);
    });

    expect(mockDispatch).toHaveBeenCalledTimes(0);

    expect(result.current.tagList).toEqual(tagList);
  });

  it('should increment a tag', async () => {
    axios.post.mockResolvedValueOnce({ data: 2 });

    const { result, waitForNextUpdate } = renderHook(() =>
      useTags(initialState, 1)
    );

    await waitForNextUpdate();

    act(() => {
      result.current.incrementTag(initialState[1], 2);
    });

    await waitForNextUpdate();

    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: BookTagActionType.START_PROCESSING,
      payload: {
        tagId: 2,
      },
    });

    expect(mockDispatch.mock.calls[1][0]).toEqual({
      type: BookTagActionType.INCREMENT_TAG,
      payload: {
        tagId: 2,
        tagRelId: 2,
      },
    });

    expect(mockDispatch.mock.calls[2][0]).toEqual({
      type: BookTagActionType.COMPLETE_PROCESSING,
      payload: {
        tagId: 2,
      },
    });

    expect(result.current.tagList).toEqual([
      {
        id: 1,
        count: 1,
        label: 'space',
      },
      {
        id: 2,
        count: 4,
        label: 'mars',
      },
    ]);
  });
});
