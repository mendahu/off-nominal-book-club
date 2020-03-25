import React, { useState, useEffect } from "react";
import SearchBar from "../../src/components/New/SearchBar";
import Layout from "../../src/components/DefaultLayout";
import SearchResultsList from "../../src/components/New/SearchResultsList";
import ConfirmResults from "../../src/components/New/ConfirmResults";
import axios from "axios";
import Router from "next/router";

export default function New() {
  const SEARCH = "SEARCH";
  const CONFIRM = "CONFIRM";

  const [searchResults, setSearchResults] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [mode, setMode] = useState(SEARCH);

  const [bookId, setBookId] = useState("1");

  const [bookObj, setBookObj] = useState({
    book: {
      id: null,
      user_id: null,
      title: null,
      description: null,
      fiction: true,
      year: null,
      image_url: null,
      google_id: null,
      isbn13: null
    },
    authors: null
  });

  // function that redirects to book/[book]
  function redirectToBook(id) {
    event => {
      event.preventDefault();
    };

    Router.push(`/books/${id}`);
  }

  function redirectToCom() {
    Router.push(`/community`);
  }

  // adds book to database with bookObj State and redirects to book/[book]
  function addBook(event) {
    // ADD BOOK --
    axios
      .post(`/api/books/new`, bookObj)
      .then(res => redirectToBook(res.data[0]));
    console.log("ADDED New Book");
  }

  // sets search term to book.tile
  function handleSearchTerm(title) {
    if (mode === SEARCH) {
      setSearchTerm(title);
    }
  }

  // function handleSearchClick(term, book) {
  //   handleSearchTerm(term);
  //   setBookObj(book);
  // }

  // sets searchResults state
  function handleResults(value) {
    setSearchResults(value);
  }

  const onSubmitHandler = async event => {
    // prevent page refresh
    event.preventDefault();
    if (mode === SEARCH) {
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
      }
    } else {
      // REDIRECT TO BOOK
      redirectToBook(bookId);
    }
  };
  // makes a get request to api/books/new and returns hits found in database

  // set bookObj state
  function selectBook(value) {
    if (mode == SEARCH) {
      setBookObj(value);
    }
  }

  return (
    <Layout>
      {mode === SEARCH && (
        <SearchBar
          results={searchResults}
          setResults={handleResults}
          searchTerm={searchTerm}
          setTerm={handleSearchTerm}
          onClick={redirectToCom}
        />
      )}
      {mode === SEARCH && (
        <SearchResultsList
          results={searchResults}
          setTerm={handleSearchTerm}
          selectBook={selectBook}
          onSubmit={onSubmitHandler}
          // onClick={handleSearchClick}
          buttonText={"Add Book"}
          mode={mode}
        />
      )}
      {mode === CONFIRM && <ConfirmResults onClick={addBook} />}
      {mode === CONFIRM && (
        <SearchResultsList
          results={searchResults}
          setTerm={handleSearchTerm}
          selectBook={selectBook}
          setBookId={setBookId}
          onSubmit={onSubmitHandler}
          buttonText={"Go to Book"}
          mode={mode}
        />
      )}
    </Layout>
  );
}
