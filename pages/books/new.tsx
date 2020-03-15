import React, { useState, useEffect } from "react";
// import NewBook from "../../src/components/NewBook";

import SearchBar from "../../src/components/SearchBar";
import SearchResultsList from "../../src/components/SearchResultsList";
import axios from "axios";

export default function New() {
  const SEARCH = "SEARCH";
  const CONFIRM = "CONFIRM";

  const [searchResults, setSearchResults] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [mode, setMode] = useState("SEARCH");

  const [bookObj, setBookObj] = useState({
    book: {
      user_id: null,
      title: null,
      description: null,
      fiction: true,
      year: null,
      image_url: null,
      google_id: null,
      isbn13: null
    },
    author: {
      name: null
    }
  });

  let noResults = false;

  function handleSearchTerm(value) {
    setSearchTerm(value);
  }
  function handleResults(value) {
    setSearchResults(value);
  }

  const onSubmitHandler = async event => {
    setMode(CONFIRM);
    event.preventDefault();
    const dbResults = await axios.get(
      `/api/books/new?googleid=${bookObj.book.google_id}&isbn13=${bookObj.book.isbn13}&title=${bookObj.book.title}`
    );
    console.log(dbResults.data.length);
    if (dbResults.data.length > 0) {
      console.log(mode);
      setSearchResults(dbResults.data);
    } else {
      noResults = true;
      console.log("no result");
      console.log(bookObj);
    }
  };

  function selectBook(value) {
    setBookObj(value);
  }

  return (
    <section>
      {mode === SEARCH && (
        <SearchBar
          results={searchResults}
          setResults={handleResults}
          searchTerm={searchTerm}
          setTerm={handleSearchTerm}
        />
      )}
      {mode === SEARCH && (
        <SearchResultsList
          results={searchResults}
          setTerm={handleSearchTerm}
          selectBook={selectBook}
          onSubmitHandler={onSubmitHandler}
        />
      )}
      {/* {mode === CONFIRM && (

      )} */}
      {mode === CONFIRM && (
        <SearchResultsList
          results={searchResults}
          setTerm={handleSearchTerm}
          selectBook={selectBook}
          onSubmitHandler={onSubmitHandler}
        />
      )}
    </section>
  );
}
