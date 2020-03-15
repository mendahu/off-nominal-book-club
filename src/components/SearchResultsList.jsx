import React from "react";
import axios from "axios";
import SearchResultsListItem from "./SearchResultsListsItem";

export default function SearchResultsList(props) {
  return (
    <section>
      {props.results.map(book => (
        <SearchResultsListItem
          onSubmit={props.onSubmitHandler}
          book={book}
          setTerm={props.setTerm}
          selectBook={props.selectBook}
        />
      ))}
    </section>
  );
}
