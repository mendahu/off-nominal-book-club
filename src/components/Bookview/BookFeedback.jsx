import { useState, useEffect } from 'react'
import BookReviewList from './BookReviewList'
import axios from 'axios'
import BookRating from './BookRating'
import BookUserReview from './BookUserReview'

const BookFeedback = (props) => {

  const emptyReview = {
    name: props.userName,
    summary: "",
    user_review: ""
  }

  const userRating = props.userRating ? props.userRating[0] : {user_rating: null}
  const userReview = props.userReview ? props.userReview[0] : emptyReview

  const [rating, setRating] = useState(userRating);
  const [permReview, setPermReview] = useState(userReview);
  const [tempReview, setTempReview] = useState(userReview);

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
    if (tempReview.id) {
      axios.patch(`/api/reviews/${tempReview.id}`, {
        summary: tempReview.summary,
        user_review: tempReview.user_review
      })
      .then(res => setPermReview({...tempReview}))
      .catch(err => console.error(err))
    } else {
      axios.post(`/api/reviews/new`, {
        bookId: props.bookId,
        userId: props.userId,
        summary: tempReview.summary,
        user_review: tempReview.user_review
      })
      .then(res => setPermReview({...tempReview, id: res.data[0]}))
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
            review={tempReview}
            submitReview={e => submitReview(e)}
            summaryChange={e => setTempReview({...tempReview, summary: e.target.value})}
            reviewChange={e => setTempReview({...tempReview, user_review: e.target.value})} />}

      <BookReviewList
        reviews={props.reviews}
        userReview={permReview}
        userRating={rating} />
    </>
    )
}

export default BookFeedback;