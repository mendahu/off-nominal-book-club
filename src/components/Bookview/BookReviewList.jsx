import { Paper, Button, TextareaAutosize, Box, TextField } from "@material-ui/core";
import { useState } from 'react'
import Rating from '@material-ui/lab/Rating';
import BookReview from './BookReview'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import axios from 'axios'

const BookReviewList = (props) => {

  const emptyReview = {
    summary: "",
    user_review: ""
  }

  const userRating = props.userRating ? props.userRating[0] : {}
  const userReview = props.userReview ? props.userReview[0] : emptyReview

  const [rating, setRating] = useState(userRating);
  const [review, setReview] = useState(userReview);
  const [reviews, setReviews] = useState(props.reviews)

  const rateBook = (value) => {
    if (rating.id) {
      axios.patch(`/api/ratings/${rating.id}`, { rating: value })
      .then(() => {
        setRating({...rating, user_rating: value})
      })
      .catch((err) => console.error(err))
    } else {
      axios.post('/api/ratings/new', {
        bookId: props.bookId,
        userId: props.userId,
        rating: value
      })
      .then((res) => setRating({id: res.data[0], user_rating: value}))
      .catch((err) => console.error(err))
    }
  }

  const submitReview = (e) => {
    e.preventDefault();
    if (review.id) {
      axios.patch(`/api/reviews/${review.id}`, {
        summary: review.summary,
        user_review: review.user_review
      })
      .then(res => setReview({...review}))
      .catch(err => console.error(err))
    } else {
      axios.post(`/api/reviews/new`, {
        bookId: props.bookId,
        userId: props.userId,
        summary: review.summary,
        user_review: review.user_review
      })
      .then(res => setReview({...review, id: res.data[0]}))
      .catch(err => console.error(err))
    }
  }

  return (
    <Paper>
      <h1>Reviews</h1>

      {props.userId && <div>

      <aside>
        <Box component="fieldset" borderColor="transparent">
          <Rating
            name="simple-controlled"
            value={rating ? rating.user_rating : 0}
            onChange={e => rateBook(e.target.value)}
          />
        </Box>
      </aside>

      <Button variant="contained" color="primary">
        <AddCircleIcon></AddCircleIcon> 
        {(review.id) ? "Update Review" : "Review"}
      </Button>

      <div>
      <Box component="fieldset" borderColor="transparent">
        <form onSubmit={e => submitReview(e)}>
          <TextField 
            label="Short Summary"
            value={review.summary}
            onChange={e => setReview({...review, summary: e.target.value})}
          /><br />
          <TextField
            label="Your Full Review"
            multiline
            rows="4"
            value={review.user_review}
            onChange={e => setReview({...review, user_review: e.target.value})}
          />
          <br />
          <Button type ="submit" variant="contained" color="primary">Submit</Button>
        </form>
        </Box>
      </div>

      </div>}

      {reviews && 
        reviews.map((review, index) => <BookReview review={review} key={index} />)}
    </Paper>
    )
}

export default BookReviewList;