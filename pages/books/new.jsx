import React, { useState, useEffect } from "react";
import SearchBar from "../../src/components/New/SearchBar";
import Layout from "../../src/components/DefaultLayout";
import SearchResultsList from "../../src/components/New/SearchResultsList";
import ConfirmResults from "../../src/components/New/ConfirmResults";
import axios from "axios";
import Router from "next/router";

export default function New() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearch, setIsSearch] = useState(true);
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

  function redirectToBook(id) {
    Router.push(`/books/${id}`);
  }

  function redirectToCom() {
    Router.push(`/community`);
  }

  // adds book to database with bookObj State and redirects to book/[book]
  function addBook(book) {
    // ADD BOOK --
    axios.post(`/api/books/new`, book).then(res => redirectToBook(res.data[0]));
    console.log("ADDED New Book");
  }

  // sets search term to book.tile
  function handleSearchTerm(title) {
    if (isSearch === true) {
      setSearchTerm(title);
    }
  }

  // sets searchResults state
  function handleResults(value) {
    setSearchResults(value);
  }

  async function selectBook(book) {
    // format google book data into database format
    const selectedBook = {
      book: {
        user_id: 10,
        title: book.title,
        description: book.description,
        fiction: true,
        year: book.year,
        image_url: book.image_url,
        google_id: book.google_id,
        isbn13: book.isbn13
      },
      authors: book.author.map(a => {
        return { name: a };
      })
    };

    // setBookObj to formatted book
    setBookObj(selectedBook);

    // check if book exists in database
    const dbResults = await axios.get(
      `/api/books/new?googleid=${selectedBook.book.google_id}&isbn13=${selectedBook.book.isbn13}&title=${selectedBook.book.title}`
    );

    // if book has hits in db, set is search to false, and set search results to db hits
    if (dbResults.data.length > 0) {
      setIsSearch(false);
      setSearchResults(dbResults.data);

      // if no hits, add book to database and redirect to book
    } else {
      addBook(selectedBook);
    }
  }

  function toSearch() {
    setSearchResults([]);
    setIsSearch(true);
  }

  return (
    <Layout>
      {isSearch === true ? (
        <SearchBar
          results={searchResults}
          setResults={handleResults}
          searchTerm={searchTerm}
          setTerm={handleSearchTerm}
          onClick={redirectToCom}
        />
      ) : (
        <ConfirmResults book={bookObj} onClick={addBook} back={toSearch} />
      )}
      {isSearch === true ? (
        <SearchResultsList
          results={searchResults}
          selectBook={selectBook}
          buttonText={"Add Book"}
          isSearch={isSearch}
        />
      ) : (
        <SearchResultsList
          results={searchResults}
          redirectToBook={redirectToBook}
          buttonText={"Go to Book"}
          isSearch={isSearch}
        />
      )}
    </Layout>
  );
}
