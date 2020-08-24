import { Paper, Grid, CardContent, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorIcon from '@material-ui/icons/Error';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(4, 2, 2, 2),
  },
  contents: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    margin: theme.spacing(2, 0, 8, 0),
  },
}));

export default function Message(props) {
  const classes = useStyles();

  const variants = {
    loading: <CircularProgress className={classes.icon} />,
    warning: <ErrorIcon className={classes.icon} fontSize="large" />,
  };

  return (
    <Grid container space={2} className={classes.root}>
      <Grid item xs={12} sm={10} md={6} lg={4}>
        <Paper>
          <CardContent className={classes.contents}>
            {variants[props.variant]}
            <Typography align="center" variant="h6" component="p">
              {props.message}
            </Typography>
          </CardContent>
        </Paper>
      </Grid>
    </Grid>
  );
}
