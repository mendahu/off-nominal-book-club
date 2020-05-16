import { useState } from 'react';
import { Chip, Box } from '@material-ui/core';
import axios from 'axios';

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

    sessionStorage.setItem('shouldRefresh', true);
  };

  const errorHandler = () => {
    alert(flag.error);
  };

  const clickHandler = (dataType) => {
    if (busy) return;
    loggedIn ? toggleData(dataType) : errorHandler();
  };

  return (
    <Box>
      <Chip
        className={classes.chip}
        onClick={() => clickHandler(flag.type)}
        label={totalCount}
        icon={userFlagId ? flag.icon_active : flag.icon_inactive}
        color={userFlagId ? 'primary' : 'default'}
      />
    </Box>
  );
}
