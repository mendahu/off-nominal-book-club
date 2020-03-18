

const BookReview = (props) => {
  return (
    <>
    <h2>{props.review.name}</h2>
    <h4>{props.review.rating} Stars - Reviewed {props.review.date}</h4>
    <p>{props.review.user_review}</p>
    </>
  )
}

export default BookReview;