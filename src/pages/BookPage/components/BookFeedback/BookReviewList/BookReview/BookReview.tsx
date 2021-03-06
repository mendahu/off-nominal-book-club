import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { Box, Typography, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { Link as MatLink } from '@material-ui/core';
import { formatDistanceToNow } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  reviewHeader: {
    display: 'flex',
  },
  avatarContainer: {
    marginRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  ratingContainer: {
    marginTop: theme.spacing(1),
  },
  reviewContainer: {
    marginTop: theme.spacing(1),
    whiteSpace: 'pre-line',
  },
}));

const BookReview = ({ review, rating }) => {
  const classes = useStyles();

  const timeAgo = formatDistanceToNow(new Date(review.date), {
    addSuffix: true,
  });

  return (
    <Box>
      <div className={classes.reviewHeader}>
        <div className={classes.avatarContainer}>
          <Avatar alt={review.name} src={review.avatar_url} />
        </div>
        <div>
          <Typography component="h3" variant="h6">
            {review.summary}
          </Typography>
          <Typography component="h4" variant="caption">
            by{' '}
            <Link href={`/users/${review.user_id}`} passHref>
              <MatLink color="inherit">{review.name}</MatLink>
            </Link>{' '}
            - {timeAgo}
          </Typography>
        </div>
      </div>

      {rating.user_rating > 0 && (
        <Box borderColor="transparent" className={classes.ratingContainer}>
          <Rating
            name="read-only"
            value={Number(rating.user_rating)}
            readOnly
          />
        </Box>
      )}

      <Typography
        component="p"
        color="textSecondary"
        variant="body2"
        paragraph
        className={classes.reviewContainer}
      >
        {review.user_review}
      </Typography>
    </Box>
  );
};

export default BookReview;
