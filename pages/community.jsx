// import BookListItem from "../CommunityView/BookListItem";
import BookList from "../src/components/CommunityView/BookList";
import SearchBar from "../src/components/CommunityView/SearchBar";
const knex = require("../db/knex");
import React, { useState, useEffect } from "react";
import Layout from "../src/components/DefaultLayout";
import axios from "axios";
const queries = require("../db/queries/books");
import Router from "next/router";

function Community({ books }) {
  const [searchResults, setSearchResults] = useState(books);
  const [searchTerm, setSearchTerm] = useState("");

  // const SetSearchTerm  = function(value) {
  //   setSearchTerm(value);
  // };
  async function getSearchResults(term) {
    const data = await axios.get(`/api/community?term=${term}`);
    setSearchResults(data.data);
  }

  function redirectToBook(id) {
    Router.push(`/books/${id}`);
  }

  useEffect(() => {
    getSearchResults(searchTerm);
  }, [searchTerm]);

  function redirectToAdd() {
    console.log("clicked");
    Router.push(`/books/new`);
  }

  return (
    <div>
      <Layout>
        <SearchBar
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          onClick={redirectToAdd}
        />
        <BookList books={searchResults} onClick={redirectToBook} />
      </Layout>
    </div>
  );
}

export default Community;
