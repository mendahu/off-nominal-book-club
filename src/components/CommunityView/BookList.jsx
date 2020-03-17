import { loadGetInitialProps } from "next/dist/next-server/lib/utils";
import BookListItem from "./BookListItem";

export default function BookList(props) {
  return (
    <section>
      {console.log(props)}
      <div>hello</div>
      {/* {props.books.map((book, index) => (
        <BookListItem key={index} book={book} />
      ))} */}
    </section>
  );
}
