import UserBookListsItem from "./UserBookListItem";

export default function UserBookList(props) {
  return (
    <section>
      {props.books.map((book, index) => (
        <UserBookListsItem key={index} book={book} />
      ))}
    </section>
  );
}
