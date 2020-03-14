import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResultsList from "./SearchResultsList";

export default function NewBook() {
  const [searchResults, setSearchResults] = useState({ items: [] });

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
      />
    </section>
  );
}
