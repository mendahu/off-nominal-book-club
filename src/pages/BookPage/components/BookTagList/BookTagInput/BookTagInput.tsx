import { ButtonBase, CircularProgress, Theme } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DoneIcon from '@material-ui/icons/Done';
import clsx from 'clsx';
import { useSnackbarContext } from '../../../../../contexts/SnackbarContext';
import { useUser } from '../../../../../../lib/user';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { AutocompleteTag } from '../../../../../types/apiTypes';

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
  input: {
    backgroundColor: theme.palette.grey[700],
    border: 'none',
    color: theme.palette.text.primary,
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    outline: '#fff auto 0px',
    '&::placeholder': {
      color: theme.palette.text.hint,
    },
  },
}));

export type BookTagInputProps = {
  addTag: (tagName: string, userId: number) => void;
  loading: boolean;
  tagList: AutocompleteTag[];
};

type TagOption = {
  id?: number;
  label: string;
  count?: number;
};

const BookTagInput = ({ addTag, loading, tagList = [] }: BookTagInputProps) => {
  const classes = useStyles();

  const [tagValue, setTagValue] = useState<TagOption>(null);
  const [input, setInput] = useState('');
  const [addMode, setAddMode] = useState(false);
  const { user } = useUser();
  const triggerSnackbar = useSnackbarContext();
  const userId = user?.onbc_id;

  const toggleAddMode = () => {
    if (addMode) {
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

  const submitTag = () => {
    setAddMode(false);
    addTag(input, userId);
    setInput('');
    setTagValue(null);
  };

  useEffect(() => {
    if (tagValue) {
      submitTag();
    }
  }, [tagValue]);

  return (
    <ButtonBase
      className={clsx(classes.chip, 'MuiChip-root', 'MuiChip-clickable')}
      onClick={() => {
        if (!addMode) {
          toggleAddMode();
        }
      }}
    >
      {addMode ? (
        <>
          <DoneIcon className={'MuiChip-icon'} onClick={toggleAddMode} />
          <Autocomplete
            value={tagValue}
            options={tagList}
            onChange={(event, newValue: string | TagOption) => {
              if (typeof newValue === 'string') {
                setTagValue({
                  label: newValue,
                });
              } else {
                setTagValue(newValue);
              }
            }}
            inputValue={input}
            onInputChange={(event, newInputValue) => {
              setInput(newInputValue);
            }}
            id="new-tag-input"
            getOptionLabel={(option): string => {
              if (typeof option === 'string') {
                return option;
              }
              return option.label;
            }}
            renderOption={(option) => {
              return `${(option as TagOption).label} (${
                (option as TagOption).count
              })`;
            }}
            freeSolo
            style={{ width: 168 }}
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <input
                  {...params.inputProps}
                  className={classes.input}
                  type="text"
                  placeholder="Enter tag"
                  autoFocus={true}
                  name="new-tag-input"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
          />
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
            <AddCircleIcon className={'MuiChip-icon'} onClick={toggleAddMode} />
          )}
          <span className={'MuiChip-label'}>
            {loading ? 'Adding Tag...' : 'Add Tag'}
          </span>
        </>
      )}
    </ButtonBase>
  );
};

export default BookTagInput;
