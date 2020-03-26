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
            variant='h5'>Log in for more!</Typography>
        </CardContent>
        
        <CardContent>
          <Typography
            component='p'
            color='textSecondary'
            variant='body2'
            paragraph>Logged in users can create wishlists, add tags, rate and review books, and more!</Typography>
          <Link href={`/community`} passHref>
            <Button variant='contained' color='primary' component='a'>Create Account</Button>
          </Link>
        </CardContent>

      </Paper>
    </Grid>
  )

  }

export default LoginPromote;
