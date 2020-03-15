import React from "react";
import axios from "axios";
import SearchResultsListItem from "./SearchResultsListsItem";

export default function SearchResultsList(props) {
  return (
    <section>
      {console.log(props.results)}
      {props.results.items.map((book, index) => (
        <SearchResultsListItem
          key={index}
          onSubmit={props.onSubmitHandler}
          book={book}
          setTerm={props.setTerm}
          selectBook={props.selectBook}
          selectAuthor={props.selectAuthor}
        />
      ))}
    </section>
  );
}
