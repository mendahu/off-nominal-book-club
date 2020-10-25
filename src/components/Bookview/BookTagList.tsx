import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Chip, CircularProgress, Grid, Paper } from '@material-ui/core';
import { useReducer, useState } from 'react';
import axios from 'axios';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import BookTagInput from './BookTagInput';
import {
  BookTagActionType,
  BookTagAction,
  bookTagReducer,
} from '../../reducers/bookTagReducer';
import { useUser } from '../../../lib/user';
import { JoinedTag } from '../../types/common';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export type BookTagListProps = {
  bookId: string;
  tags: JoinedTag[];
};

const BookTagList = ({ bookId, tags }: BookTagListProps) => {
  const classes = useStyles();

  const { user } = useUser();
  const [state, dispatch] = useReducer(bookTagReducer, tags);
  const userId = user?.onbc_id;
  const triggerSnackbar = useSnackbarContext();
  const [inputLoading, setInputLoading] = useState(false);

  const hasTooManyTags = (tags) => {
    const userTags = tags.filter((tag) => tag.tagRelId);
    return userTags.length >= 5;
  };

  const triggerTooManyTagsSnackbar = () => {
    triggerSnackbar({
      active: true,
      message: 'You may only add up to 5 tags per book.',
      severity: 'warning',
    });
  };

  const triggerAPIErrorSnackbar = () => {
    triggerSnackbar({
      active: true,
      message: 'Something went wrong saving your book tag change.',
      severity: 'warning',
    });
  };

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

  const addTag = async (tagName, userId) => {
    let tagId;
    if (hasTooManyTags(state)) {
      return triggerTooManyTagsSnackbar();
    }
    try {
      setInputLoading(true);
      const tagIdResponse = await axios.post(`/api/tags/new`, { tagName });
      tagId = await tagIdResponse.data[0];
      const tagRelIdResponse = await axios.post(`/api/tagRels/new`, {
        tagId,
        userId,
        bookId,
      });
      const tagRelId = await tagRelIdResponse.data[0];
      dispatch({
        type: BookTagActionType.ADD_TAG,
        payload: {
          tagName,
          tagId,
          tagRelId,
        },
      });
    } catch {
      triggerAPIErrorSnackbar();
    }
    dispatch(generateProcessingAction(tagId, 'stop'));
    setInputLoading(false);
  };

  const toggleTag = async (tag: JoinedTag, userId: number) => {
    if (tag.loading) {
      return;
    }

    if (tag.tagRelId) {
      try {
        dispatch(generateProcessingAction(tag.tag_id, 'start'));
        await axios.delete(`/api/tagRels/${tag.tagRelId}/delete`);
        dispatch({
          type:
            tag.count === 1
              ? BookTagActionType.REMOVE_TAG
              : BookTagActionType.DECREMENT_TAG,
          payload: { tagId: tag.tag_id },
        });
      } catch {
        triggerAPIErrorSnackbar();
      }
      dispatch(generateProcessingAction(tag.tag_id, 'stop'));
    } else {
      if (hasTooManyTags(state)) {
        return triggerTooManyTagsSnackbar();
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
      } catch {
        triggerAPIErrorSnackbar();
      }
      dispatch(generateProcessingAction(tag.tag_id, 'stop'));
    }
  };

  return (
    <Grid item xs={12}>
      <Paper className={classes.root}>
        {state.length > 0 &&
          state.map((tag, index) => {
            const avatar = (
              <Avatar>
                {tag.loading ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  tag.count
                )}
              </Avatar>
            );
            return (
              <Chip
                key={index}
                className={classes.chip}
                label={tag.tag_name}
                avatar={avatar}
                onClick={() => toggleTag(tag, userId)}
                color={tag.tagRelId >= 0 ? 'primary' : 'default'}
              />
            );
          })}

        <BookTagInput addTag={addTag} loading={inputLoading} />
      </Paper>
    </Grid>
  );
};

export default BookTagList;
