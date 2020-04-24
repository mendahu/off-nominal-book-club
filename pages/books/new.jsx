import React, { useState } from "react";
import SearchBar from "../../src/components/New/SearchBar";
import Layout from "../../src/components/DefaultLayout";
import SearchResultsList from "../../src/components/New/SearchResultsList";
import ConfirmResults from "../../src/components/New/ConfirmResults";
import axios from "axios";
import Router from "next/router";
import { useFetchUser } from '../../lib/user'
import Message from '../../src/components/Utility/Message'

export default function New() {

  const { user, loading } = useFetchUser();
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
    Router.push(`/`);
  }

  // adds book to database with bookObj State and redirects to book/[book]
  function addBook(book) {
    axios.post(`/api/books/new`, book).then(res => redirectToBook(res.data[0]));
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
        user_id: user.app_metadata.onbc_id,
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

  if ((!user && !loading) || (!user?.isPatron && !loading)) {
    return (
      <Layout>
        <Message variant="warning" message='You must be logged in and a Patron to add books.' />
      </Layout>
    )
  }

  return (
    <Layout>
      {loading &&
        <Message variant='loading' message='Validating credentials...' />
      }
      {(!loading && user?.isPatron) && 
        (isSearch
          ?
            <>
              <SearchBar
                results={searchResults}
                setResults={handleResults}
                searchTerm={searchTerm}
                setTerm={handleSearchTerm}
                onClick={redirectToCom}
              />
              <SearchResultsList
                results={searchResults}
                selectBook={selectBook}
                buttonText={"Add Book"}
                isSearch={isSearch}
              />
            </>
          :
            <>
              <ConfirmResults book={bookObj} onClick={addBook} back={toSearch} />
              <SearchResultsList
                results={searchResults}
                redirectToBook={redirectToBook}
                buttonText={"Go to Book"}
                isSearch={isSearch}
              />
            </>)
      }
    </Layout>
  );
}
