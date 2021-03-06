import { useState } from 'react';
import {
  Grid,
  Paper,
  Box,
  Button,
  TextField,
  CardContent,
  IconButton,
  Typography,
  Collapse,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { useSnackbarContext } from '../../../../../contexts/SnackbarContext';

const useStyles = makeStyles((theme) => ({
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
    padding: theme.spacing(1, 2, 1, 2),
  },
}));

const BookUserReview = ({ review, submitReview, setSummary, setReview }) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);
  const [busy, setBusy] = useState(false);
  const triggerSnackbar = useSnackbarContext();

  const handleExpandClick = () => setExpanded(!expanded);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);

    try {
      await submitReview();
    } catch ({ message, severity }) {
      triggerSnackbar({ active: true, message, severity });
    }

    setBusy(false);
  };

  return (
    <Grid item xs={12} sm={8}>
      <Paper>
        <CardContent className={classes.header}>
          <Typography component="h2" variant="h5">
            {review.id ? 'Update Review' : 'Review'}
          </Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardContent>

        <Collapse in={expanded} unmountOnExit>
          <CardContent>
            <Box component="form" onSubmit={(e) => handleSubmit(e)}>
              <TextField
                label="Short Summary"
                value={review.summary}
                onChange={setSummary}
                fullWidth
                error={review.summary.length > 255}
                helperText={
                  review.summary.length > 255
                    ? 'Summaries should be 255 characters or fewer.'
                    : ''
                }
                margin="normal"
              />
              <TextField
                fullWidth
                label="Your Full Review"
                margin="normal"
                multiline
                rows="6"
                value={review.user_review}
                onChange={setReview}
              />
              <Button type="submit" variant="contained" color="primary">
                {review.id ? 'Update' : 'Submit'}
              </Button>
            </Box>
          </CardContent>
        </Collapse>
      </Paper>
    </Grid>
  );
};

export default BookUserReview;
