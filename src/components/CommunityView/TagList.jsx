import { Paper, Chip, Avatar, makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    height: "5vh"
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));
export default function TagList(props) {
  const classes = useStyles();
  return (
    <section>
      <Paper>
        {props.tags.slice(0, 5).map((tag, index) => (
          <Button
            type='submit'
            onClick={e => {
              e.preventDefault();
              props.onClick(tag.tag_name);
            }}>
            <Chip
              label={tag.tag_name}
              avatar={<Avatar>{tag.count}</Avatar>}
              className={classes.chip}
            />
          </Button>
        ))}
      </Paper>
    </section>
  );
}
