import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(1),
  },
}));

export const TagListSkeleton = () => {
  const classes = useStyles();

  return (
    <>
      <Skeleton
        variant="text"
        width={100}
        height={33}
        className={classes.chip}
      />
      <Skeleton
        variant="text"
        width={100}
        height={33}
        className={classes.chip}
      />
      <Skeleton
        variant="text"
        width={100}
        height={33}
        className={classes.chip}
      />
      <Skeleton
        variant="text"
        width={100}
        height={33}
        className={classes.chip}
      />
      <Skeleton
        variant="text"
        width={100}
        height={33}
        className={classes.chip}
      />
    </>
  );
};

export default TagListSkeleton;
