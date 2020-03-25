import { Grid, Paper, Box, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  box: {
    padding: theme.spacing(1.25, 0, 0.5, 0)
  },
  text: {
    fontSize: '1.0rem',
    [theme.breakpoints.up('450')]: {
      fontSize: '1.5rem'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.5rem',
      paddingTop: theme.spacing(1)
    }
  }
}));

const BookRating = (props) => {

  const classes = useStyles();

  return (
    <Grid item xs={12} sm={4}>
      <Paper className={classes.root}>
      
        <Box>
          <Typography 
            component='h2'
            className={classes.text}>Rate this book</Typography>
        </Box>
      
        <Box 
          component="fieldset" 
          borderColor="transparent"
          className={classes.box}>
          <Rating
            name="simple-controlled"
            value={props.rating ? props.rating.user_rating : 0}
            onChange={e => props.rateBook(e.target.value)}
          />
        </Box>
      
      </Paper>
    </Grid>
  )
}

export default BookRating;
