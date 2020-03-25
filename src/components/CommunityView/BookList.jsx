import BookListItem from "./BookListItem";
import { Box } from '@material-ui/core'

export default function BookList(props) {

  return (
    <Box component='section'>
      {props.books &&
        props.books.map((book, index) => (
          <BookListItem
            key={index}
            book={book}
            onClick={props.onClick}
            selectTag={props.selectTag}
          />
        ))}
    </Box>
  );
}
