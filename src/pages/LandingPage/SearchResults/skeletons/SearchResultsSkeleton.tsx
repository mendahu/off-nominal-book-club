import { Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  content: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: '1 0 293px',
    order: 2,
    [theme.breakpoints.down('xs')]: {
      order: 3,
      flex: '1 0 100%',
    },
  },
  metaDataContainer: {
    order: 3,
    [theme.breakpoints.down('xs')]: {
      order: 2,
    },
    marginRight: theme.spacing(3),
  },
  chipContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  chip: {
    margin: theme.spacing(0.5, 0.5),
  },
  desc: {
    [theme.breakpoints.down(400)]: {
      display: 'none',
    },
  },
}));

export const SearchResultsSkeleton = () => {
  const classes = useStyles();

  const skeleton = (
    <Paper className={classes.root}>
      <Skeleton variant="rect" width={128} height={196} />
      <div className={classes.content}>
        <Skeleton variant="text" width={150} height={40} />
        <Skeleton variant="text" width={200} height={25} />
        <Skeleton
          variant="text"
          width={300}
          height={30}
          className={classes.desc}
        />
        <div className={classes.chipContainer}>
          <Skeleton
            variant="text"
            width={60}
            height={20}
            className={classes.chip}
          />
          <Skeleton
            variant="text"
            width={60}
            height={20}
            className={classes.chip}
          />
          <Skeleton
            variant="text"
            width={60}
            height={20}
            className={classes.chip}
          />
        </div>
      </div>
      <div className={classes.metaDataContainer}>
        <Skeleton variant="text" width={60} height={45} />
        <Skeleton variant="text" width={60} height={45} />
        <Skeleton variant="text" width={60} height={45} />
        <Skeleton variant="text" width={60} height={45} />
      </div>
    </Paper>
  );

  const skeletonArray = [skeleton, skeleton, skeleton];
  return (
    <>
      {skeleton}
      {skeleton}
      {skeleton}
    </>
  );
};

export default SearchResultsSkeleton;
