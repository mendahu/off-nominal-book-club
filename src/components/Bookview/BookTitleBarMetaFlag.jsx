import { useState, useContext } from 'react';
import { Chip, Box, Tooltip } from '@material-ui/core';
import axios from 'axios';
import { SnackbarContext } from '../../../pages/books/[id]';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function BookTitleBarMetaFlag({ flag, loggedIn, userBook }) {
  const classes = useStyles();

  const [userFlagId, setUserFlagId] = useState(flag.status);
  const [totalCount, setTotalCount] = useState(Number(flag.count));
  const [busy, setBusy] = useState(false);
  const triggerSnackbar = useContext(SnackbarContext);

  const toggleData = (dataType) => {
    setBusy(true);

    //store existing data in case db call fails
    const flagId = userFlagId;
    const currentCount = totalCount;

    if (userFlagId) {
      setUserFlagId(null);
      setTotalCount(currentCount - 1);

      axios
        .delete(`/api/${dataType}/${userFlagId}/delete`)
        .catch((err) => {
          console.error(err);
          setUserFlagId(flagId);
          setTotalCount(currentCount);
        })
        .finally(() => setBusy(false));
    } else {
      setUserFlagId(true);
      setTotalCount(currentCount + 1);

      axios
        .post(`/api/${dataType}/new`, userBook)
        .then((res) => {
          setUserFlagId(res.data[0]);
        })
        .catch((err) => {
          console.error(err);
          setUserFlagId(null);
          setTotalCount(currentCount);
        })
        .finally(() => setBusy(false));
    }
  };

  const errorHandler = () => {
    triggerSnackbar({
      active: true,
      message: flag.error,
      severity: 'warning',
    });
  };

  const clickHandler = (dataType) => {
    if (busy) return;
    loggedIn ? toggleData(dataType) : errorHandler();
  };

  return (
    <Box>
      <Tooltip title={flag.tooltip} placement="left">
        <Chip
          className={classes.chip}
          onClick={() => clickHandler(flag.type)}
          label={totalCount}
          icon={userFlagId ? flag.icon_active : flag.icon_inactive}
          color={userFlagId ? 'primary' : 'default'}
        />
      </Tooltip>
    </Box>
  );
}
