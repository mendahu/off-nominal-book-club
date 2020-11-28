import { Paper, Chip, Avatar, makeStyles } from '@material-ui/core';
import { SearchTag } from '../useSearch/useSearch';
import TagListSkeleton from './skeletons/TagListSkeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    [theme.breakpoints.up('lg')]: {
      flexWrap: 'wrap',
      padding: theme.spacing(1),
    },
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

  return (
    <Paper className={classes.root}>
      {loading ? (
        <TagListSkeleton />
      ) : (
        tags
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
          ))
      )}
    </Paper>
  );
}
