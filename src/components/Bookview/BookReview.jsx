import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const BookReview = (props) => {

  return (
    <>
    <h2>{props.review.summary}</h2>
    <h3>by {props.review.name} on {props.review.date}</h3>
    <aside>
      <Box component="fieldset" mb={props.review.rating} borderColor="transparent">
        <Rating name="read-only" value={props.review.rating} readOnly />
      </Box>
    </aside>
    <p>{props.review.user_review}</p>
    </>
  )
}

export default BookReview;