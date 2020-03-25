import React from 'react';
import { 
  Grid, 
  Paper, 
  CardContent, 
  Typography } from '@material-ui/core';
import BookReview from './BookReview'

const BookReviewList = (props) => {

  return (

    <Grid item xs={12}>
      <Paper>
        <CardContent>

          <Typography 
            component='h2' 
            variant='h5'
            gutterBottom>Community Reviews</Typography>

          {props.userReview.id && 
            <BookReview 
              review={props.userReview} 
              rating={props.userRating}/>}
          
          {props.reviews && 
            props.reviews.map((indReview, index) => (
              <BookReview 
                review={indReview} 
                rating={{user_rating: indReview.rating}} 
                key={index}/>))}
        
        </CardContent>
      </Paper>
    </Grid>
  )
}

export default BookReviewList;