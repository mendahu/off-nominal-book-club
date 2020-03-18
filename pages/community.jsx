// import BookListItem from "../CommunityView/BookListItem";
import BookList from "../src/components/CommunityView/BookList";
import SearchBar from "../src/components/CommunityView/SearchBar";
const knex = require("../db/knex");
import React, { useState, useEffect } from "react";
import Layout from "../src/components/DefaultLayout";
import axios from "axios";
const queries = require("../db/queries/books");

function Community({ books }) {
  const [searchResults, setSearchResults] = useState(books);
  const [searchTerm, setSearchTerm] = useState("");

  // const SetSearchTerm  = function(value) {
  //   setSearchTerm(value);
  // };
  async function getSearchResults(term) {
    const data = await axios.get(`/api/community?term=${term}`);
    setSearchResults(data.data);
    console.log(data);
  }

  useEffect(() => {
    getSearchResults(searchTerm);
  }, [searchTerm]);

  return (
    <div>
      <Layout>
        <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        <BookList books={searchResults} />
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const books = await queries.books.getAll("");
  return { props: { books } };
}

export default Community;
