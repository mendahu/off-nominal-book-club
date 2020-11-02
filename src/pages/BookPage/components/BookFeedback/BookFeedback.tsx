import { useState } from 'react';
import BookReviewList from './BookReviewList/BookReviewList';
import axios from 'axios';
import BookRating from './BookRating/BookRating';
import BookUserReview from './BookUserReview/BookUserReview';

const BookFeedback = ({ userId, userData, book, isPatron }) => {
  const { id: bookId, reviews } = book;
  const { name, rating, review } = userData;

  const db_rating = rating ? rating[0] : { user_rating: null };
  const db_review = review ? review[0] : { name, summary: '', user_review: '' };

  //this component maintains two states for both ratings and reviews to allow for faster feedback without altering db in the case of a db call error
  const [mutableRating, setMutableRating] = useState(db_rating);
  const [permRating, setPermRating] = useState(db_rating);
  const [mutableReview, setMutableReview] = useState(db_review);
  const [permReview, setPermReview] = useState(db_review);

  const rateBook = async (value) => {
    if (Number(value) === permRating.user_rating) return;

    //provides user immediate feedback
    const newRating = { ...mutableRating, user_rating: Number(value) };
    setMutableRating(newRating);

    try {
      if (mutableRating.id) {
        await axios.patch(`/api/ratings/${mutableRating.id}/update`, {
          rating: value,
        });
      } else {
        const result = await axios.post('/api/ratings/new', {
          bookId,
          userId,
          rating: value,
        });
        newRating.id = result.data[0];
        setMutableRating(newRating);
      }
    } catch (error) {
      setMutableRating(permRating);
      throw error;
    }

    setPermRating(newRating);
    return;
  };

  const submitReview = async () => {
    if (mutableReview.summary.length > 255) {
      throw {
        message: 'Your review summary should be 255 characters or fewer.',
        severity: 'error',
      };
    }

    if (
      mutableReview.summary === permReview.summary &&
      mutableReview.user_review === permReview.user_review
    ) {
      throw {
        message: "You haven't made any changes to submit!",
        severity: 'warning',
      };
    }

    const newReview = { ...mutableReview };
    const { summary, user_review } = newReview;

    try {
      if (mutableReview.id) {
        await axios.patch(`/api/reviews/${mutableReview.id}/update`, {
          summary,
          user_review,
        });
      } else {
        const newReviewId = await axios.post(`/api/reviews/new`, {
          bookId,
          userId,
          summary,
          user_review,
        });
        newReview.id = newReviewId.data[0];
        setMutableReview({ ...mutableReview, id: newReview.id });
      }
    } catch (error) {
      console.error(error);
      throw {
        message: 'There was an error submitting your review.',
        severity: 'error',
      };
    }

    setPermReview(newReview);
    return;
  };

  return (
    <>
      {isPatron && <BookRating rating={mutableRating} rateBook={rateBook} />}

      {isPatron && (
        <BookUserReview
          review={mutableReview}
          submitReview={submitReview}
          setSummary={(e) =>
            setMutableReview({ ...mutableReview, summary: e.target.value })
          }
          setReview={(e) =>
            setMutableReview({ ...mutableReview, user_review: e.target.value })
          }
        />
      )}

      <BookReviewList
        reviews={reviews}
        userReview={permReview}
        userRating={permRating}
      />
    </>
  );
};

export default BookFeedback;
