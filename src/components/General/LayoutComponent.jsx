import { Grid, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  child: {
    padding: theme.spacing(3),
  },
  fullHeight: {
    height: "100%",
  },
  flex: {
    display: "flex",
  },
  flexCol: {
    flexDirection: "column",
  },
}));

const LayoutComponent = (props) => {
  const classes = useStyles();

  const { fullHeight, flexbox, ...rest } = props;

  return (
    <Grid item {...rest} className={classes.root}>
      <Paper
        className={clsx(classes.child, {
          [classes.fullHeight]: fullHeight,
          [classes.flex]: flexbox,
          [classes.flexCol]: flexbox === "col",
        })}
      >
        {props.children}
      </Paper>
    </Grid>
  );
};

export default LayoutComponent;
