import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Chip, CircularProgress, Grid, Paper } from '@material-ui/core';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import BookTagInput from './BookTagInput';
import { useUser } from '../../../lib/user';
import { JoinedTag } from '../../types/common';
import { AutocompleteTag } from '../../types/apiTypes';
import { useTags } from '../../hooks/useTags';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export type BookTagListProps = {
  bookId: number;
  tags: JoinedTag[];
};

const BookTagList = ({ bookId, tags }: BookTagListProps) => {
  const classes = useStyles();

  const { user } = useUser();
  const userId = user?.onbc_id;
  const triggerSnackbar = useSnackbarContext();
  const {
    state,
    tagList,
    inputLoading,
    addTag,
    incrementTag,
    decrementTag,
  } = useTags(tags, bookId);

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

  const hasTooManyTags = (tags) => {
    const userTags = tags.filter((tag) => tag.tagRelId);
    return userTags.length >= 5;
  };

  const handleClick = async (tag, shouldDecrement) => {
    try {
      if (!shouldDecrement && hasTooManyTags(state)) {
        return triggerTooManyTagsSnackbar();
      }
      shouldDecrement
        ? await decrementTag(tag, userId)
        : await incrementTag(tag, userId);
    } catch (err) {
      triggerAPIErrorSnackbar();
    }
  };

  const handleAddTag = async (tagName, userId) => {
    try {
      if (hasTooManyTags(state)) {
        return triggerTooManyTagsSnackbar();
      }
      await addTag(tagName, userId);
    } catch {
      triggerAPIErrorSnackbar();
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
            const isSelected = tag.tagRelId >= 0;
            return (
              <Chip
                key={index}
                className={classes.chip}
                label={tag.tag_name}
                avatar={avatar}
                onClick={() => handleClick(tag, isSelected)}
                color={isSelected ? 'primary' : 'default'}
              />
            );
          })}

        <BookTagInput
          addTag={handleAddTag}
          loading={inputLoading}
          tagList={tagList}
        />
      </Paper>
    </Grid>
  );
};

export default BookTagList;
