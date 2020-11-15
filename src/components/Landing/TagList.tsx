import { Paper, Chip, Avatar, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { SearchTag } from '../../pages/LandingPage/useSearch/useSearch';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    width: '100%',
  },
  chip: {
    margin: theme.spacing(1),
  },
}));

export type TagListProps = {
  tags: SearchTag[];
  clickHandler: (label: string) => void;
  loading: boolean;
};

export default function TagList({
  tags = [],
  clickHandler,
  loading,
}: TagListProps) {
  const classes = useStyles();

  const renderLoadingSkeleton = () => {
    const skeleton = (
      <Skeleton
        variant="text"
        width={100}
        height={33}
        className={classes.chip}
      />
    );
    const skeletonArray = [skeleton, skeleton, skeleton, skeleton, skeleton];
    return <>{skeletonArray.map((item) => item)}</>;
  };

  return (
    <Paper className={classes.root}>
      {loading
        ? renderLoadingSkeleton()
        : tags
            .slice(0, 10)
            .map((tag, index) => (
              <Chip
                key={index}
                onClick={() => clickHandler(tag.label)}
                label={`#${tag.label}`}
                avatar={<Avatar>{tag.count}</Avatar>}
                className={classes.chip}
                color={tag.selected ? 'primary' : 'default'}
              />
            ))}
    </Paper>
  );
}
