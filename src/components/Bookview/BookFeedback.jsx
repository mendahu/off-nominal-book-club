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
  const [ mutableRating, setMutableRating ] = useState(db_rating);
  const [ permRating, setPermRating ]       = useState(db_rating);
  const [ mutableReview, setMutableReview ] = useState(db_review);
  const [ permReview, setPermReview ]       = useState(db_review);
  const [ open, setOpen ]                   = useState(false);

  console.log("perm", permRating)
  console.log("mutable", mutableRating)

  const closeError = (e, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  }

  const rateBook = async (value) => {

    if (Number(value) === permRating.user_rating) return;

    //provides user immediate feedback
    const newRating = {...mutableRating, user_rating: Number(value)}
    setMutableRating(newRating)

    try {
      if (mutableRating.id) {
        await axios.patch(`/api/ratings/${mutableRating.id}/update`, { rating: value })
      } else {
        const result = await axios.post('/api/ratings/new', {
          bookId,
          userId,
          rating: value
        })
        newRating.id = result.data[0]
        setMutableRating(newRating)
      }
    }
    catch (error) {
      setMutableRating(permRating)
      throw error;
    }

    setPermRating(newRating)
    return;
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