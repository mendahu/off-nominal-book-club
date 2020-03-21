import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import moment from 'moment'

const BookReview = (props) => {

  const timeAgo = moment(props.review.date).fromNow();

  console.log(props.review)

  return (
    <div>
      <h2>{props.review.summary}</h2>
      <h3>by {props.review.name} {timeAgo}</h3>

      {(props.review.rating > 0) && 
        <aside>
          <Box component="fieldset" borderColor="transparent">
            <Rating name="read-only" value={props.review.rating} readOnly />
          </Box>
        </aside>
      }

      <p>{props.review.user_review}</p>
    </div>
  )
}

export default BookReview;