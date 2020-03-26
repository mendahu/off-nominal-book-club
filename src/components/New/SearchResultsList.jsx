import { Box } from "@material-ui/core";

import SearchResultsListItem from "./SearchResultsListsItem";

export default function SearchResultsList(props) {
  return (
    <Box>
      {props.results.map((book, index) => (
        <SearchResultsListItem
          index={index}
          key={index}
          results={props.results}
          onSubmit={props.onSubmit}
          book={book}
          setTerm={props.setTerm}
          selectBook={props.selectBook}
          setBookId={props.setBookId}
          buttonText={props.buttonText}
          mode={props.mode}
        />
      ))}
    </Box>
  );
}
