import { BookTag, JoinedTag, UserTag } from '../../../types/common';
import {
  BookTagAction,
  BookTagActionType,
  bookTagReducer,
  buildInitialTagState,
} from '../bookTagReducer';

describe('buildInitialTagState', () => {
  let commTags: BookTag[];
  let userTags: UserTag[];

  beforeEach(() => {
    commTags = [
      {
        tag_name: 'space',
        count: 1,
        tag_id: 1,
      },
      {
        tag_name: 'mars',
        count: 3,
        tag_id: 2,
      },
    ];

    userTags = [
      {
        tag_id: 1,
        tag_rel_id: 1,
      },
    ];
  });

  it('should render correct initial state when both values are null', () => {
    const result = buildInitialTagState(null, null);
    expect(result).toEqual([]);
  });

  it('should render correct initial state when no user Tags selected', () => {
    const expectedResult: JoinedTag[] = [
      {
        tag_name: 'space',
        count: 1,
        tag_id: 1,
        loading: false,
      },
      {
        tag_name: 'mars',
        count: 3,
        tag_id: 2,
        loading: false,
      },
    ];
    const result = buildInitialTagState(commTags, null);
    expect(result).toEqual(expectedResult);
  });

  it('should render correct initial state when user Tags selected', () => {
    const expectedResult: JoinedTag[] = [
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
    const result = buildInitialTagState(commTags, userTags);
    expect(result).toEqual(expectedResult);
  });
});

describe('bookTagReducer', () => {
  let initialState: JoinedTag[];
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
  });

  it('should increment a tag', () => {
    const action: BookTagAction = {
      type: BookTagActionType.INCREMENT_TAG,
      payload: {
        tagId: 2,
        tagRelId: 2,
      },
    };

    const expectedResult: JoinedTag[] = [
      {
        tag_name: 'space',
        count: 1,
        tag_id: 1,
        loading: false,
        tagRelId: 1,
      },
      {
        tag_name: 'mars',
        count: 4,
        tag_id: 2,
        loading: true,
        tagRelId: 2,
      },
    ];

    const result = bookTagReducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should decrement a tag', () => {
    const action: BookTagAction = {
      type: BookTagActionType.DECREMENT_TAG,
      payload: {
        tagId: 1,
      },
    };

    const expectedResult: JoinedTag[] = [
      {
        tag_name: 'space',
        count: 0,
        tag_id: 1,
        loading: true,
        tagRelId: undefined,
      },
      {
        tag_name: 'mars',
        count: 3,
        tag_id: 2,
        loading: false,
      },
    ];

    const result = bookTagReducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should add a tag', () => {
    const action: BookTagAction = {
      type: BookTagActionType.ADD_TAG,
      payload: {
        tagId: 3,
        tagRelId: 3,
        tagName: 'rockets',
      },
    };

    const expectedResult: JoinedTag[] = [
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
      {
        tag_name: 'rockets',
        count: 1,
        tag_id: 3,
        loading: true,
        tagRelId: 3,
      },
    ];

    const result = bookTagReducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should remove a tag', () => {
    const action: BookTagAction = {
      type: BookTagActionType.REMOVE_TAG,
      payload: {
        tagId: 1,
      },
    };

    const expectedResult: JoinedTag[] = [
      {
        tag_name: 'mars',
        count: 3,
        tag_id: 2,
        loading: false,
      },
    ];

    const result = bookTagReducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should start processing a tag', () => {
    const action: BookTagAction = {
      type: BookTagActionType.START_PROCESSING,
      payload: {
        tagId: 1,
      },
    };

    const expectedResult: JoinedTag[] = [
      {
        tag_name: 'space',
        count: 1,
        tag_id: 1,
        loading: true,
        tagRelId: 1,
      },
      {
        tag_name: 'mars',
        count: 3,
        tag_id: 2,
        loading: false,
      },
    ];

    const result = bookTagReducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should end processing a tag', () => {
    const action: BookTagAction = {
      type: BookTagActionType.COMPLETE_PROCESSING,
      payload: {
        tagId: 1,
      },
    };

    const initialState: JoinedTag[] = [
      {
        tag_name: 'space',
        count: 1,
        tag_id: 1,
        loading: true,
        tagRelId: 1,
      },
      {
        tag_name: 'mars',
        count: 3,
        tag_id: 2,
        loading: false,
      },
    ];

    const expectedResult: JoinedTag[] = [
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

    const result = bookTagReducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should return same state if no action type passed', () => {
    const result = bookTagReducer(initialState, {
      type: 'bananas',
      payload: {},
    });
    expect(result).toEqual(result);
  });
});
