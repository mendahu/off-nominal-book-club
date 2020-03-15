import React, { useState } from "react";
// import NewBook from "../../src/components/NewBook";

import SearchBar from "../../src/components/SearchBar";
import SearchResultsList from "../../src/components/SearchResultsList";
import axios from "axios";

export default function New() {
  const [searchResults, setSearchResults] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [bookObj, setBookObj] = useState({});
  const [authorObj, setAuthorObj] = useState({});

  function handleSearchTerm(value) {
    setSearchTerm(value);
  }
  function handleResults(value) {
    setSearchResults(value);
  }

  function selectBook(value) {
    setBookObj(value);
  }

  function selectAuthor(value) {
    setAuthorObj(value);
  }

  function onSubmitHandler(event) {
    console.log("here");
    return axios
      .get(`localhost:3000/api/books/new`)
      .then(res => console.log(res));
  }
  return (
    <section>
      {}
      <SearchBar
        results={searchResults}
        setResults={handleResults}
        searchTerm={searchTerm}
        setTerm={handleSearchTerm}
      />
      <SearchResultsList
        results={searchResults}
        setTerm={handleSearchTerm}
        selectBook={selectBook}
        selectAuthor={selectAuthor}
        onSubmitHandler={onSubmitHandler}
      />
    </section>
  );
}
