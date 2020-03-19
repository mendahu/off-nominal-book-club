import React from "react";
import axios from "axios";
import SearchResultsListItem from "./SearchResultsListsItem";

export default function SearchResultsList(props) {
  return (
    <section>
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
    </section>
  );
}
