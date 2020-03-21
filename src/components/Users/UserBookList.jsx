import UserBookListsItem from "./UserBookListItem";

export default function UserBookList(props) {
  return (
    <section>
      {console.log(props)}
      {props.favourites.favourites.map((book, index) => (
        <UserBookListsItem key={index} book={book} />
      ))}
    </section>
  );
}
