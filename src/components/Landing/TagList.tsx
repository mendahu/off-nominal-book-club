import { Paper, Chip, Avatar, makeStyles } from '@material-ui/core';
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
};

export default function TagList({ tags = [], clickHandler }: TagListProps) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      {tags.slice(0, 10).map((tag, index) => (
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
