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
  Collapse } from '@material-ui/core'
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

const BookUserReview = (props) => {

  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item xs={12} sm={8}>
      <Paper>

        <CardContent className={classes.header}>
          <Typography component='h2' variant='h5'>{(props.reviewState.id) ? "Update Review" : "Review"}</Typography>
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

            <Box component='form' onSubmit={props.submitReview}>
              <TextField 
                label="Short Summary"
                value={props.review.summary}
                onChange={props.summaryChange}
                fullWidth
                margin='normal'
              />
              <TextField
                fullWidth
                label="Your Full Review"
                margin='normal'
                multiline
                rows="6"
                value={props.review.user_review}
                onChange={props.reviewChange}
              />
              <Button 
                type ="submit" 
                variant="contained" 
                color="primary">
                  {(props.reviewState.id) ? "Update" : "Submit"}
              </Button>
            </Box>

          </CardContent>
        </Collapse>

      </Paper>
    </Grid>
  )
}

export default BookUserReview;
