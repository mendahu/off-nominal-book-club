import { BookTag, UserTag, JoinedTag } from '../types/common';

export enum BookTagActionType {
  INCREMENT_TAG = 'INCREMENT_TAG',
  DECREMENT_TAG = 'DECREMENT_TAG',
  ADD_TAG = 'ADD_TAG',
  REMOVE_TAG = 'REMOVE_TAG',
  START_PROCESSING = 'START_PROCESSING',
  COMPLETE_PROCESSING = 'COMPLETE_PROCESSING',
}

export type BookTagAction = {
  type: BookTagActionType;
  payload: {
    tagName?: string;
    tagId?: number;
    tagRelId?: number;
  };
};

export const buildInitialTagState = (
  commTags: BookTag[] | null,
  userTags: UserTag[] | null
): JoinedTag[] => {
  if (!commTags) {
    return [] as JoinedTag[];
  }
  const tagsWithLoadingProperty: JoinedTag[] = commTags.map((tag) => ({
    ...tag,
    loading: false,
  }));

  if (userTags) {
    tagsWithLoadingProperty.forEach((tag, index) => {
      const tagIndex: number = userTags.findIndex(
        (userTag) => userTag.tag_id === tag.tag_id
      );
      if (tagIndex >= 0) {
        tagsWithLoadingProperty[index].tagRelId = userTags[tagIndex].tag_rel_id;
      }
    });
  }

  return tagsWithLoadingProperty;
};

export const bookTagReducer = (state: JoinedTag[], action: BookTagAction) => {
  switch (action.type) {
    case 'INCREMENT_TAG':
      return state.map((tag) => {
        if (tag.tag_id === action.payload.tagId) {
          const newTag: JoinedTag = {
            ...tag,
            tagRelId: action.payload.tagRelId,
            loading: true,
          };
          newTag.count++;
          return newTag;
        } else {
          return tag;
        }
      });
    case 'DECREMENT_TAG':
      return state.map((tag) => {
        if (tag.tag_id === action.payload.tagId) {
          const newTag: JoinedTag = {
            ...tag,
            tagRelId: undefined,
            loading: true,
          };
          newTag.count--;
          return newTag;
        } else {
          return tag;
        }
      });
    case 'ADD_TAG':
      return [
        ...state,
        {
          count: 1,
          tagRelId: action.payload.tagRelId,
          tag_name: action.payload.tagName,
          tag_id: action.payload.tagId,
          loading: true,
        },
      ];
    case 'REMOVE_TAG':
      return state.filter((tag) => tag.tag_id !== action.payload.tagId);
    case 'START_PROCESSING':
      return state.map((tag) => {
        if (tag.tag_id === action.payload.tagId) {
          return { ...tag, loading: true };
        } else {
          return tag;
        }
      });
    case 'COMPLETE_PROCESSING':
      return state.map((tag) => {
        if (tag.tag_id === action.payload.tagId) {
          return { ...tag, loading: false };
        } else {
          return tag;
        }
      });
    default:
      return state;
  }
};
