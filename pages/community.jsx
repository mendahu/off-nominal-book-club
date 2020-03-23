import  { Container } from "@material-ui/core";
import BookList from "../src/components/CommunityView/BookList";
import SearchBar from "../src/components/CommunityView/SearchBar";
import TagList from "../src/components/CommunityView/TagList";
import Loading from "../src/components/CommunityView/Loading";
import HeroCarousel from "../src/components/CommunityView/HeroCarousel";
import React, { useState, useEffect } from "react";
import Layout from "../src/components/LandingLayout";
import axios from "axios";
const queries = require("../db/queries/books");
import Router from "next/router";

function Community({ books, mostFavId, highestRatedId, randomBookIndex }) {
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
        <HeroCarousel 
          randomBook={books[randomBookIndex]} 
          mostFavBook={books[books.findIndex(book => book.id == mostFavId)]}
          highestRatedBook={books[books.findIndex(book => book.id == highestRatedId)]}
        />
        <Container component="main" maxWidth={false}>
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
        </Container>
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const books = queries.books.getAll("");
  const mostFavId = queries.books.getMostFavourite();
  const highestRatedId = queries.books.getHighestRated();
  
  return Promise.all([books, mostFavId, highestRatedId])
  .then((res) => {

      const books = res[0].rows
      const mostFavId = res[1][0].id
      const highestRatedId = res[2][0].id
      const randomBookIndex = Math.floor(Math.random() * books.length)

      return { props: { books, mostFavId, highestRatedId, randomBookIndex } }
    })
}

export default Community;
