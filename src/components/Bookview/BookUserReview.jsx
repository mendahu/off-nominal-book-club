import { useState } from 'react'
import { 
  Grid, 
  Paper, 
  Box, 
  Button, 
  TextField, 
  CardContent,
  IconButton,
  Typography,
  Snackbar,
  Collapse } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2, 1, 2)
  }
}));

const BookUserReview = ({ review, submitReview, setSummary, isTooLong, setReview, errorOpen, closeError }) => {
  const classes = useStyles();

  const [ expanded, setExpanded ] = useState(false);
  const handleExpandClick = () => setExpanded(!expanded);

  return (
    <Grid item xs={12} sm={8}>
      <Paper>

        <CardContent className={classes.header}>
          <Typography component='h2' variant='h5'>{(review.id) ? "Update Review" : "Review"}</Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
            <ExpandMoreIcon />
          </IconButton>
        </CardContent>

            
        <Collapse in={expanded} unmountOnExit>
          <CardContent>

            <Box component='form' onSubmit={submitReview}>
              <TextField 
                label="Short Summary"
                value={review.summary}
                onChange={setSummary}
                fullWidth
                error={isTooLong}
                helperText={isTooLong ? "Summaries should be 255 characters or fewer." : ""}
                margin='normal'
              />
              <TextField
                fullWidth
                label="Your Full Review"
                margin='normal'
                multiline
                rows="6"
                value={review.user_review}
                onChange={setReview}
              />
              <Button 
                type ="submit" 
                variant="contained" 
                color="primary">
                  {(review.id) ? "Update" : "Submit"}
              </Button>
              <Snackbar 
                open={errorOpen}
                autoHideDuration={6000}
                onClose={closeError}>
                  <Alert onClose={closeError} severity="error" variant='filled'>
                    Check your form for errors!
                  </Alert>
                </Snackbar>
            </Box>

          </CardContent>
        </Collapse>

      </Paper>
    </Grid>
  )
}

export default BookUserReview;
