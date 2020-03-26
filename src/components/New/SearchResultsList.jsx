import { Box } from "@material-ui/core";

import SearchResultsListItem from "./SearchResultsListsItem";

export default function SearchResultsList(props) {
  return (
    <Box>
      {props.results.map((book, index) => (
        <SearchResultsListItem
          book={book}
          index={index}
          key={index}
          results={props.results}
          selectBook={props.selectBook}
          redirectToBook={props.redirectToBook}
          buttonText={props.buttonText}
          isSearch={props.isSearch}
        />
      ))}
    </Box>
  );
}
