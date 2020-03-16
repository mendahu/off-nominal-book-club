import React, { useState, useEffect } from "react";
// import NewBook from "../../src/components/NewBook";

import SearchBar from "../../src/components/SearchBar";
import SearchResultsList from "../../src/components/SearchResultsList";
import ConfirmResults from "../../src/components/ConfirmResults";
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
    if (dbResults.data.length > 0) {
      setSearchResults(dbResults.data);
    } else {
      // console.log(bookObj);
      axios.post(`/api/books/new`, bookObj).then(res => console.log(res));
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
          buttonText={"Add Book"}
        />
      )}
      {mode === CONFIRM && <ConfirmResults />}
      {mode === CONFIRM && (
        <SearchResultsList
          results={searchResults}
          setTerm={handleSearchTerm}
          selectBook={selectBook}
          onSubmitHandler={onSubmitHandler}
          buttonText={"Go to Book"}
        />
      )}
    </section>
  );
}
