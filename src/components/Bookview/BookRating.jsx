import { Grid, Paper, Box, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(1.1)
    },
  },
  rateBox: {
    padding: theme.spacing(1.25, 0, 0.5, 0),
    textAlign: 'center',
    [theme.breakpoints.up('790')]: {
      minWidth: '100%',
    }
  }
}));

const BookRating = ({ rating, rateBook }) => {

  const classes = useStyles();

  return (
    <Grid item xs={12} sm={4}>
      <Paper className={classes.root}>
      
        <Box>
          <Typography>Rate this book</Typography>
        </Box>
      
        <Box 
          component="fieldset" 
          borderColor="transparent"
          className={classes.rateBox}>
          <Rating
            name="simple-controlled"
            value={Number(rating?.user_rating || 0)}
            onChange={e => rateBook(e.target.value)}
          />
        </Box>
      
      </Paper>
    </Grid>
  )
}

export default BookRating;
