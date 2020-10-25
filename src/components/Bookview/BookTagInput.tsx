import { ButtonBase, CircularProgress } from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DoneIcon from '@material-ui/icons/Done';
import clsx from 'clsx';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useUser } from '../../../lib/user';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export type BookTagInputProps = {
  addTag: (tagName: string, userId: number) => void;
  loading: boolean;
};

const BookTagInput = ({ addTag, loading }: BookTagInputProps) => {
  const classes = useStyles();

  const [addMode, setAddMode] = useState(false);
  const { user } = useUser();
  const triggerSnackbar = useSnackbarContext();
  const userId = user?.onbc_id;

  const toggleAddMode = () => {
    if (addMode) {
      addTag('space', userId);
      setAddMode(false);
    } else {
      user && user.isPatron
        ? setAddMode(true)
        : triggerSnackbar({
            active: true,
            message:
              'Only logged in patrons may change tags on books. Consider supporting us for as little as $1/month!',
            severity: 'warning',
          });
    }
  };

  return (
    <ButtonBase
      className={clsx(classes.chip, 'MuiChip-root', 'MuiChip-clickable')}
      onClick={toggleAddMode}
    >
      {addMode ? (
        <>
          <DoneIcon className={'MuiChip-icon'} />

          {/* <form onSubmit={(e) => addTag(e)}>
            <span>
              #
              <input
                autoFocus
                type="text"
                id="tagInputField"
                className={classes.tagInput}
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value.toLowerCase())}
                onClick={(e) => stopClick(e)}
              ></input>
              <button type="submit" hidden></button>
            </span>
          </form> */}
        </>
      ) : (
        <>
          {loading ? (
            <CircularProgress
              className={'MuiChip-icon'}
              size={18}
              color="inherit"
            />
          ) : (
            <AddCircleIcon className={'MuiChip-icon'} />
          )}
          <span className={'MuiChip-label'}>Add Tag</span>
        </>
      )}
    </ButtonBase>
  );
};

export default BookTagInput;
