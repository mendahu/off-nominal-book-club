import React, { useState } from "react";
// import NewBook from "../../src/components/NewBook";

import SearchBar from "../../src/components/SearchBar";
import SearchResultsList from "../../src/components/SearchResultsList";
import axios from "axios";

export default function New() {
  const [searchResults, setSearchResults] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [bookObj, setBookObj] = useState({
    user_id: null,
    title: null,
    description: null,
    fiction: true,
    year: null,
    image_url: null,
    google_id: null,
    isbn13: null
  });
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

  const onSubmitHandler = async event => {
    event.preventDefault();
    const confirmResults = await axios.get(`/api/books/new?googleid=${bookObj.google_id}&isbn13=${bookObj.isbn13}&title=${bookObj.title}`);
    setSearchResults(confirmResults.data);
  };
  return (
    <section>
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
