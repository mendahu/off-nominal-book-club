import { Avatar, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function BookTag({ tagData, handleClick }) {
  const classes = useStyles();
  const { tag_name, tagRelId, count } = tagData;
  const [busy, setBusy] = useState(false);

  const toggleTag = async () => {
    if (busy) return;

    setBusy(true); //debounces multiple clicks

    await handleClick();

    setBusy(false);
  };

  return (
    <Chip
      label={tag_name}
      avatar={<Avatar>{count}</Avatar>}
      className={classes.chip}
      color={tagRelId >= 0 ? 'primary' : 'default'}
      onClick={toggleTag}
    />
  );
}
