import React, { useState, useEffect } from "react";
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

  // function that redirects to book/[book]
  function redirectToBook(event) {
    event.preventDefault();
    console.log("Redirect to Book");
  }

  // adds book to database with bookObj State and redirects to book/[book]
  function addBook(event) {
    axios.post(`/api/books/new`, bookObj).then(res => console.log(res));
    console.log("ADDED New Book");
    redirectToBook(event);
  }

  // sets search term to book.tile
  function handleSearchTerm(title) {
    if (mode === SEARCH) {
      setSearchTerm(title);
    }
  }

  // sets searchResults state
  function handleResults(value) {
    setSearchResults(value);
  }

  const onSubmitHandler = async event => {
    // prevent page refresh
    event.preventDefault();

    // makes a get request to api/books/new and returns hits found in database
    const dbResults = await axios.get(
      `/api/books/new?googleid=${bookObj.book.google_id}&isbn13=${bookObj.book.isbn13}&title=${bookObj.book.title}`
    );

    // if results found, set mode to confirm and setSearchResults to db hits
    if (dbResults.data.length > 0) {
      setMode(CONFIRM);
      setSearchResults(dbResults.data);

      // if no hits, add book to database and redirect to book
    } else {
      addBook(event);
      redirectToBook(event);
    }
  };

  // set bookObj state
  function selectBook(value) {
    if (mode == SEARCH) {
      setBookObj(value);
    }
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
      {mode === CONFIRM && <ConfirmResults onClick={addBook} />}
      {mode === CONFIRM && (
        <SearchResultsList
          results={searchResults}
          setTerm={handleSearchTerm}
          selectBook={selectBook}
          onSubmitHandler={redirectToBook}
          buttonText={"Go to Book"}
        />
      )}
    </section>
  );
}
