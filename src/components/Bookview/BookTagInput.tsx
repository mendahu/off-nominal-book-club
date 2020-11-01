import { ButtonBase, CircularProgress, Theme } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DoneIcon from '@material-ui/icons/Done';
import clsx from 'clsx';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useUser } from '../../../lib/user';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
};

type TagOption = {
  id?: number;
  label: string;
  count?: number;
};

const tagOptions: TagOption[] = [
  { id: 31, label: 'space', count: 6 },
  { id: 1, label: 'mars', count: 5 },
  { id: 2, label: 'rovers', count: 4 },
  { id: 6, label: 'planetary science', count: 3 },
  { id: 17, label: 'opportunity', count: 2 },
];

const BookTagInput = ({ addTag, loading }: BookTagInputProps) => {
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
      onClick={toggleAddMode}
    >
      {addMode ? (
        <>
          <DoneIcon className={'MuiChip-icon'} />
          <Autocomplete
            value={tagValue}
            options={tagOptions}
            onChange={(event, newValue: string | null) => {
              setTagValue({
                label: newValue,
              });
            }}
            inputValue={input}
            onInputChange={(event, newInputValue) => {
              setInput(newInputValue);
            }}
            id="new-tag-input"
            getOptionLabel={(option) => {
              if (typeof option === 'string') {
                return option;
              }
              return option.label;
            }}
            renderOption={(option) => {
              return `${option.label} (${option.count})`;
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
            <AddCircleIcon className={'MuiChip-icon'} />
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
