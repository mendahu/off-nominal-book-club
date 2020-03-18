import BookListItem from "./BookListItem";

export default function BookList(props) {
  return (
    <section>
      {props.books.map((book, index) => (
        <BookListItem key={index} book={book} />
      ))}
    </section>
  );
}
