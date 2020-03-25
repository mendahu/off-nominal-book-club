import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { Box, Typography } from '@material-ui/core';
import moment from 'moment'

const BookReview = (props) => {

  const timeAgo = moment(props.review.date).fromNow();

  return (

    <Box>
      <Typography 
        component='h3'
        variant='h6'>{props.review.summary}</Typography>
      <Typography 
        component='h4'
        variant='caption'>by {props.review.name} - {timeAgo}</Typography>

      {(props.rating.user_rating > 0) && 
        <Box borderColor="transparent">
          <Rating name="read-only" value={props.rating.user_rating} readOnly />
        </Box>
      }

      <Typography 
        component='p'
        color='textSecondary'
        variant='body2'
        paragraph>{props.review.user_review}</Typography>
    </Box>
  )
}

export default BookReview;