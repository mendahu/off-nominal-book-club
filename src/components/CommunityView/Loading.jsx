import { CircularProgress, Paper, makeStyles } from "@material-ui/core";

export default function Loading() {
  const useStyles = makeStyles(theme => ({
    card: {
      display: "flex",
      height: "250px"
    },
    tags: {
      display: "flex",
      height: "5vh"
    },
    circle: {
      margin: "auto"
    }
  }));
  const classes = useStyles();
  let cards = [];
  for (let i = 0; i < 10; ++i) {
    cards.push(
      <Paper className={classes.card}>
        <CircularProgress className={classes.circle} />
      </Paper>
    );
  }
  return (
    <section>
      <Paper className={classes.tags}>
        <CircularProgress className={classes.circle} />
      </Paper>
      {cards}
    </section>
  );
}
