import { Grid, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const LayoutComponent = (props) => {
  const classes = useStyles();

  return (
    <Grid item {...props}>
      <Paper className={classes.root}>{props.children}</Paper>
    </Grid>
  );
};

export default LayoutComponent;
