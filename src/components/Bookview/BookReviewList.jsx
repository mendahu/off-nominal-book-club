import { 
  Button,
  Box,
  Card,
  CardContent,
  TextField,
  Typography } from "@material-ui/core";
import { useState } from 'react'
import Rating from '@material-ui/lab/Rating';
import BookReview from './BookReview'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1, 0),
  }
}));

const BookReviewList = (props) => {

  const classes = useStyles();

  const emptyReview = {
    summary: "",
    user_review: ""
  }

  const userRating = props.userRating ? props.userRating[0] : {user_rating: null}
  const userReview = props.userReview ? props.userReview[0] : emptyReview

  const [rating, setRating] = useState(userRating);
  const [review, setReview] = useState(userReview);

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
    <>
      
      {props.userId &&
        <Card className={classes.root}>
          <CardContent>

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
                <Button type ="submit" variant="contained" color="primary">Save</Button>
              </form>
              </Box>
            </div>

          </CardContent>
        </Card>
      }

      <Card className={classes.root}>
        <CardContent>
          <Typography component='h2' variant='h5'>Reviews</Typography>
          {review.id && <BookReview review={review} rating={rating}/>}
          {props.reviews && 
            props.reviews.map((indReview, index) => <BookReview review={indReview} rating={{user_rating: indReview.rating}} key={index}/>)}
        </CardContent>
      </Card>

    </>
    )
}

export default BookReviewList;