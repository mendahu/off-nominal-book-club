import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import moment from 'moment'

const BookReview = (props) => {

  const timeAgo = moment(props.review.date).fromNow();

  return (
    <div>
      <h2>{props.review.summary}</h2>
      <h3>by {props.review.name} {timeAgo}</h3>

      {(props.rating.user_rating > 0) && 
        <aside>
          <Box component="fieldset" borderColor="transparent">
            <Rating name="read-only" value={props.rating.user_rating} readOnly />
          </Box>
        </aside>
      }

      <p>{props.review.user_review}</p>
    </div>
  )
}

export default BookReview;