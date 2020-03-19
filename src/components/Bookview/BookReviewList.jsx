import { Paper } from "@material-ui/core";
import BookReview from './BookReview'

const BookReviewList = (props) => {
  const reviews = props.reviews;

  return (
    <Paper>
      <h1>Reviews</h1>
      {reviews && 
        reviews.map((review, index) => <BookReview review={review} key={index} />)}
    </Paper>
    )
}

export default BookReviewList;