import { Grid, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  child: {
    padding: theme.spacing(3),
  },
  fullChild: {
    padding: theme.spacing(3),
    height: '100%',
  },
}));

const LayoutComponent = (props) => {
  const classes = useStyles();

  const { fullHeight, ...rest } = props;

  return (
    <Grid item {...rest} className={classes.root}>
      {fullHeight ? (
        <Paper className={classes.fullChild}>{props.children}</Paper>
      ) : (
        <Paper className={classes.child}>{props.children}</Paper>
      )}
    </Grid>
  );
};

export default LayoutComponent;
