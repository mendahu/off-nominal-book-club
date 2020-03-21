// import BookListItem from "../CommunityView/BookListItem";
import BookList from "../src/components/CommunityView/BookList";
import SearchBar from "../src/components/CommunityView/SearchBar";
import TagList from "../src/components/CommunityView/TagList";
import Loading from "../src/components/CommunityView/Loading";
const knex = require("../db/knex");
import React, { useState, useEffect } from "react";
import Layout from "../src/components/DefaultLayout";
import axios from "axios";
const queries = require("../db/queries/books");
import Router from "next/router";

function Community({ books }) {
  const LOADING = "LOADING";
  const RESULTS = "RESULTS";

  const [searchResults, setSearchResults] = useState(books);
  const [searchTerm, setSearchTerm] = useState("");
  const [tagList, setTagList] = useState([]);
  const [mode, setMode] = useState(RESULTS);

  function changeMode(mode) {
    setMode(mode);
  }
  async function getSearchResults(term) {
    const bookData = await axios.get(`/api/community/books?term=${term}`);
    const tagsData = await axios.get(`/api/community/tags?term=${term}`);
    setSearchResults(bookData.data);
    setTagList(tagsData.data);
  }

  async function selectTag(tag) {
    const bookData = await axios.get(`/api/community/tags/${tag}`);
    setSearchResults(bookData.data);
    console.log("click select");
  }

  function redirectToBook(id) {
    Router.push(`/books/${id}`);
  }

  useEffect(() => {
    getSearchResults(searchTerm);
  }, [searchTerm]);

  function redirectToAdd() {
    Router.push(`/books/new`);
  }

  return (
    <div>
      <Layout>
        <SearchBar
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          onClick={redirectToAdd}
          setMode={changeMode}
        />
        {mode === LOADING && <Loading />}
        <TagList tags={tagList} onClick={selectTag} />
        <BookList
          books={searchResults}
          onClick={redirectToBook}
          selectTag={selectTag}
        />
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await queries.books.getAll("");
  const books = data.rows;
  return { props: { books } };
}

export default Community;
