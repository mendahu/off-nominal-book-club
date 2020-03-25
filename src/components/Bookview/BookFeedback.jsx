import { useState, useEffect } from 'react'
import BookReviewList from './BookReviewList'
import axios from 'axios'
import BookRating from './BookRating'
import BookUserReview from './BookUserReview'

const BookFeedback = (props) => {

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
      {props.loggedIn &&
          <BookRating
            rating={rating} 
            rateBook={rateBook}/>}

      {props.loggedIn &&
          <BookUserReview 
            review={review}
            submitReview={e => submitReview(e)}
            summaryChange={e => setReview({...review, summary: e.target.value})}
            reviewChange={e => setReview({...review, user_review: e.target.value})} />}

      <BookReviewList
        reviews={props.reviews}
        userReview={review}
        userRating={rating} />
    </>
    )
}

export default BookFeedback;