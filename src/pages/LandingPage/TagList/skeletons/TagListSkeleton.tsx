import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(1),
  },
}));

export const TagListSkeleton = () => {
  const classes = useStyles();

  const skeleton = (
    <Skeleton variant="text" width={100} height={33} className={classes.chip} />
  );
  const skeletonArray = [skeleton, skeleton, skeleton, skeleton, skeleton];
  return <>{skeletonArray.map((item) => item)}</>;
};

export default TagListSkeleton;
