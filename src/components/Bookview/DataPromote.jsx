import { Grid, Paper, Button, Typography, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2, 2, 2)
  }
}));

const LoginPromote = (props) => {

  const classes = useStyles();

  return (
    <Grid item xs={12} sm={4}>
      <Paper>

        <CardContent className={classes.header}>
          <Typography 
            component='h2' 
            variant='h5'>Tell us about this book!</Typography>
        </CardContent>
        
        <CardContent>
          <Typography
            component='p'
            color='textSecondary'
            variant='body2'
            paragraph>The Off-Nominal Book Club is powered by user feedback. Tell us what you think of this book by adding tags, reviews, or ratings!</Typography>
        </CardContent>

      </Paper>
    </Grid>
  )

  }

export default LoginPromote;
