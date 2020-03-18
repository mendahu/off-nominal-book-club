// import BookListItem from "../CommunityView/BookListItem";
import BookList from "../src/components/CommunityView/BookList";
import SearchBar from "../src/components/CommunityView/SearchBar";
const knex = require("../db/knex");
import React, { useState, useEffect } from "react";
import Layout from "../src/components/DefaultLayout";
import axios from "axios";

function Community({ books }) {
  const [searchResults, setSearchResults] = useState(books);
  const [searchTerm, setSearchTerm] = useState("");

  async function getSearchResults() {
    // const data = await axios.get;
  }

  useEffect(() => {
    console.log("changes search term");
  }, [searchTerm]);

  console.log(searchResults);
  return (
    <div>
      <Layout>
        <SearchBar />
        <BookList books={searchResults} />
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const books = await knex
    .select(
      "id",
      "title",
      "fiction",
      "year",
      "description",
      "image_url",
      "isbn13",
      "google_id"
    )
    .from("books");

  return { props: { books } };
}

export default Community;
