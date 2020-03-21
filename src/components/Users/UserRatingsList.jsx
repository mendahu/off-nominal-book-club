import UserRatingListItem from "./UserRatingsListItem";

export default function UserBookList(props) {
  return (
    <section>
      {props.books.map((book, index) => (
        <UserRatingListItem key={index} book={book} />
      ))}
    </section>
  );
}
