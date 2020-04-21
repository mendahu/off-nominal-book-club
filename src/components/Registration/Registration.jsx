import { 
  Grid, 
  Paper } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import AddPatreon from './AddPatreon'
import CompleteProfile from './CompleteProfile'

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(4, 2, 2, 2)
  }
}));

export default function Registration(props) {
  const classes = useStyles();

  return (
      <Grid container space={2} className={classes.root}>
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Paper>
            {props.patreon 
              ? <AddPatreon skipProfile={props.onSkip} />
              : <CompleteProfile user={props.user}/>
            }
          </Paper>
        </Grid>
      </Grid>
  );
}
