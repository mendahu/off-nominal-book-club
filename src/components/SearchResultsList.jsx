import React from "react";
import axios from "axios";
import SearchResultsListItem from "./SearchResultsListsItem";

export default function SearchResultsList(props) {
  const onSubmitHandler = event => {
    console.log("here");
    return axios
      .post(`localhost:3000/books/new`, { bookObj, authorObj })
      .then(res => console.log(res));
  };

  return (
    <section>
      {props.results.items.map((book, index) => (
        <SearchResultsListItem
          key={index}
          onSubmit={onSubmitHandler}
          book={book}
          setTerm={props.setTerm}
          selectBook={props.selectBook}
          selectAuthor={props.selectAuthor}
        />
      ))}
    </section>
  );
}
