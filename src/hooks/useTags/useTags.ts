import { AutocompleteTag } from '../../types/apiTypes';
import { JoinedTag } from '../../types/common';
import { useState, useReducer, useEffect } from 'react';
import {
  bookTagReducer,
  BookTagActionType,
  BookTagAction,
} from '../../reducers/bookTagReducer/bookTagReducer';
import axios from 'axios';

export const useTags = (tags: JoinedTag[], bookId: number) => {
  const [inputLoading, setInputLoading] = useState(false);
  const [state, dispatch] = useReducer(bookTagReducer, tags);
  const [tagList, setTagList] = useState<AutocompleteTag[]>([]);

  useEffect(() => {
    (async function tagFetcher() {
      const response = await axios.get('/api/tags');
      setTagList(response.data);
    })();
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

  const generateIncrementTagAction = (
    tagId: number,
    tagRelId: number
  ): BookTagAction => {
    return {
      type: BookTagActionType.INCREMENT_TAG,
      payload: { tagId, tagRelId },
    };
  };

  const generateDecrementTagAction = (
    count: number,
    tagId: number
  ): BookTagAction => {
    return {
      type:
        count === 1
          ? BookTagActionType.REMOVE_TAG
          : BookTagActionType.DECREMENT_TAG,
      payload: { tagId },
    };
  };

  const generateAddTagAction = (
    tagName: string,
    tagId: number,
    tagRelId: number
  ): BookTagAction => {
    return {
      type: BookTagActionType.ADD_TAG,
      payload: {
        tagName,
        tagId,
        tagRelId,
      },
    };
  };

  const changeTagListCount = (
    list: AutocompleteTag[],
    tagId: number,
    increment: boolean,
    newTagName?: string
  ) => {
    let hasChanged = false;
    const newTagList = list.map((tag) => {
      if (tag.id === tagId) {
        const newTag = { ...tag };
        increment ? newTag.count++ : newTag.count--;
        hasChanged = true;
        return newTag;
      } else {
        return tag;
      }
    });
    if (hasChanged) {
      return newTagList;
    } else {
      newTagList.push({
        count: 1,
        id: tagId,
        label: newTagName,
      });
      return newTagList;
    }
  };

  const addTag = async (tagName: string, userId: number) => {
    let tagId;
    setInputLoading(true);
    try {
      try {
        const tagIdResponse = await axios.post(`/api/tags/new`, { tagName });
        tagId = await tagIdResponse.data.id;
      } catch (err) {
        throw 'api-error';
      }

      const existingTag = state.find((tag) => tag.tag_id === tagId);
      const bookAlreadyTaggedByUser = existingTag?.tagRelId;

      if (bookAlreadyTaggedByUser) {
        throw 'already-added';
      }

      let tagRelId: number;

      try {
        const tagRelIdResponse = await axios.post(`/api/tagRels/new`, {
          tagId,
          userId,
          bookId,
        });
        tagRelId = await tagRelIdResponse.data[0];
      } catch (err) {
        throw 'api-error';
      }

      if (existingTag) {
        dispatch(generateIncrementTagAction(tagId, tagRelId));
        console.log(tagList, tagId);
        setTagList(changeTagListCount(tagList, tagId, true));
      } else {
        dispatch(generateAddTagAction(tagName, tagId, tagRelId));
        const newTag = {
          id: tagId,
          count: 1,
          label: tagName,
        };
        setTagList(changeTagListCount(tagList, tagId, true, tagName));
      }
      return tagRelId;
    } catch (err) {
      throw err;
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
      const newTagRelId = await response.data;
      dispatch(generateIncrementTagAction(tag.tag_id, newTagRelId));
      setTagList(changeTagListCount(tagList, tag.tag_id, true));
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
      dispatch(generateDecrementTagAction(tag.count, tag.tag_id));
      setTagList(changeTagListCount(tagList, tag.tag_id, false));
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
