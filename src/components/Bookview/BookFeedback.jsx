import { useState } from 'react'
import BookReviewList from './BookReviewList'
import axios from 'axios'
import BookRating from './BookRating'
import BookUserReview from './BookUserReview'

const BookFeedback = ({ userId, userData, book, isPatron }) => {

  const { id: bookId, reviews } = book;
  const { name, rating, review } = userData;

  const db_rating = rating ? rating[0] : { user_rating: null }
  const db_review = review ? review[0] : { name, summary: "", user_review: "" }

  //this component maintains two states for both ratings and reviews to allow for faster feedback without altering db in the case of a db call error
  const [mutableRating, setMutableRating]   = useState(db_rating);
  const [permRating, setPermRating]         = useState(db_rating);
  const [mutableReview, setMutableReview]   = useState(db_review);
  const [permReview, setPermReview]         = useState(db_review);
  const [open, setOpen]                     = useState(false);

  const closeError = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  const rateBook = (value) => {

    //provides user immediate feedback
    setMutableRating({...mutableRating, user_rating: value})

    if (mutableRating.id) {
      axios.patch(`/api/ratings/${mutableRating.id}/update`, { rating: value })
        .then(() => setPermRating({...permRating, user_rating: value}))
        .catch(err => {
          console.error(err)
          setMutableRating({...mutableRating, user_rating: permRating.user_rating}) // return mutable to permanent state if error
        })
    } else {
      axios.post('/api/ratings/new', {
        bookId,
        userId,
        rating: value
      })
        .then(res => {
          setPermRating({id: res.data[0], user_rating: value})
          return res.data[0]
        })
        .catch(err => console.error(err))
        .finally((id) => setMutableRating({id, user_rating: value})) // resets mutable Rating to new state or old state if error
    }
  }

  const submitReview = (e) => {
    e.preventDefault();
    if (mutableReview.summary.length > 255) return setOpen(true)

    if (mutableReview.id) {
      axios.patch(`/api/reviews/${mutableReview.id}/update`, {
        summary: mutableReview.summary,
        user_review: mutableReview.user_review
      })
      .then(res => setPermReview({...mutableReview}))
      .catch(err => console.error(err))
    } else {
      axios.post(`/api/reviews/new`, {
        bookId,
        userId,
        summary: mutableReview.summary,
        user_review: mutableReview.user_review
      })
      .then(res => {
        setPermReview({...mutableReview, id: res.data[0]})
        return setMutableReview({...mutableReview, id: res.data[0]})
    })
      .catch(err => console.error(err))
    }
  }

  return (
    <>
      {isPatron &&
        <BookRating
          rating={mutableRating} 
          rateBook={rateBook}/>}

      {isPatron &&
        <BookUserReview 
          review={mutableReview}
          isTooLong={mutableReview.summary.length > 255}
          errorOpen={open}
          closeError={closeError}
          submitReview={e => submitReview(e)}
          setSummary={e => setMutableReview({...mutableReview, summary: e.target.value})}
          setReview={e => setMutableReview({...mutableReview, user_review: e.target.value})} />}

      <BookReviewList
        reviews={reviews}
        userReview={permReview}
        userRating={permRating} />
    </>
    )
}

export default BookFeedback;