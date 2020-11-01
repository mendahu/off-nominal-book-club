import { AutocompleteTag } from '../types/apiTypes';
import { JoinedTag } from '../types/common';
import { useState, useReducer, useEffect } from 'react';
import {
  bookTagReducer,
  BookTagActionType,
  BookTagAction,
} from '../reducers/bookTagReducer';
import axios from 'axios';

export const useTags = (tags: JoinedTag[], bookId: number) => {
  const [inputLoading, setInputLoading] = useState(false);
  const [state, dispatch] = useReducer(bookTagReducer, tags);
  const [tagList, setTagList] = useState<AutocompleteTag[]>([]);

  useEffect(() => {
    axios.get('/api/tags').then((res) => {
      setTagList(res.data);
    });
  }, []);

  const generateProcessingAction = (
    tagId: number,
    status: 'start' | 'stop'
  ): BookTagAction => {
    return {
      type:
        status === 'start'
          ? BookTagActionType.START_PROCESSING
          : BookTagActionType.COMPLETE_PROCESSING,
      payload: { tagId },
    };
  };

  const addTag = async (tagName: string, userId: number) => {
    let tagId;
    try {
      setInputLoading(true);
      const tagIdResponse = await axios.post(`/api/tags/new`, { tagName });
      tagId = await tagIdResponse.data.id;
      const tagRelIdResponse = await axios.post(`/api/tagRels/new`, {
        tagId,
        userId,
        bookId,
      });
      const tagRelId = await tagRelIdResponse.data[0];
      if (state.some((tag) => tag.tag_id === tagId)) {
        dispatch({
          type: BookTagActionType.INCREMENT_TAG,
          payload: {
            tagId,
            tagRelId,
          },
        });
      } else {
        dispatch({
          type: BookTagActionType.ADD_TAG,
          payload: {
            tagName,
            tagId,
            tagRelId,
          },
        });
        const newTag = {
          id: tagId,
          count: 1,
          label: tagName,
        };
        setTagList([...tagList, newTag]);
      }
      return tagRelId;
    } catch {
      throw new Error();
    } finally {
      dispatch(generateProcessingAction(tagId, 'stop'));
      setInputLoading(false);
    }
  };

  const incrementTag = async (tag: JoinedTag, userId: number) => {
    if (tag.loading) {
      return;
    }
    try {
      dispatch(generateProcessingAction(tag.tag_id, 'start'));
      const response = await axios.post(`/api/tagRels/new`, {
        tagId: tag.tag_id,
        userId,
        bookId,
      });
      const newTagRelId = response.data;
      dispatch({
        type: BookTagActionType.INCREMENT_TAG,
        payload: {
          tagId: tag.tag_id,
          tagRelId: newTagRelId,
        },
      });
      return newTagRelId;
    } catch {
      throw new Error();
    } finally {
      dispatch(generateProcessingAction(tag.tag_id, 'stop'));
    }
  };

  const decrementTag = async (tag: JoinedTag, userId: number) => {
    if (tag.loading) {
      return;
    }
    try {
      dispatch(generateProcessingAction(tag.tag_id, 'start'));
      const response = await axios.delete(
        `/api/tagRels/${tag.tagRelId}/delete`
      );
      dispatch({
        type:
          tag.count === 1
            ? BookTagActionType.REMOVE_TAG
            : BookTagActionType.DECREMENT_TAG,
        payload: { tagId: tag.tag_id },
      });
      return response;
    } catch {
      throw new Error();
    } finally {
      dispatch(generateProcessingAction(tag.tag_id, 'stop'));
    }
  };

  return {
    state,
    tagList,
    inputLoading,
    addTag,
    incrementTag,
    decrementTag,
  };
};
