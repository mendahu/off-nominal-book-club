import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Chip, Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const BookTagList = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
        {props.tags.map((t, index) => (
          <Chip
            key={index}
            label={t.tag_name} 
            avatar={<Avatar>{t.count}</Avatar>}
            className={classes.chip}
          />
        ))}
    </Paper>
  )
}

export default BookTagList