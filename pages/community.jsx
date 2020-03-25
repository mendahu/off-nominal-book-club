import { Container } from "@material-ui/core";
import SearchBar from "../src/components/SearchBar";
import BookList from "../src/components/CommunityView/BookList";
import TagList from "../src/components/CommunityView/TagList";
import Loading from "../src/components/CommunityView/Loading";
import HeroCarousel from "../src/components/CommunityView/HeroCarousel";
import React, { useState, useEffect, useRef } from "react";
import Layout from "../src/components/LandingLayout";
import axios from "axios";
const queries = require("../db/queries/books");
import Router from "next/router";
import Fuse from "fuse.js";

function Community({ books, mostFavId, highestRatedId, randomBookIndex }) {
  // const isFirstRun = useRef(true);
  // useEffect(() => {
  //   if (isFirstRun.current) {
  //     isFirstRun.current = false;
  //   }
  // });

  const searchOptions = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    minMatchCharLength: 2,
    keys: ["title", "authors_string", "tags_string"]
  };

  let fuse = new Fuse(books, searchOptions);

  const LOADING = "LOADING";
  const RESULTS = "RESULTS";

  const [searchResults, setSearchResults] = useState(books);
  // const [searchTerm, setSearchTerm] = useState("");
  const [tagList, setTagList] = useState([]);
  const [mode, setMode] = useState(RESULTS);
  const [input, setInput] = useState("");

  async function getSearchResults(term) {
    const bookData = await fuse
      .search(term)
      .slice(0, 5)
      .map(item => {
        return item.item;
      });
    const tagsData = await axios.get(`/api/community/tags?term=${term}`);
    setSearchResults(bookData);
    setTagList(tagsData.data);

    // const bookData = await axios.get(`/api/community/books?term=${term}`);
  }

  async function selectTag(tag) {
    const bookData = await axios.get(`/api/community/tags/${tag}`);
    setSearchResults(bookData.data);
  }

  function redirectToBook(id) {
    Router.push(`/books/${id}`);
  }

  function redirectToAdd() {
    Router.push(`/books/new`);
  }

  // useEffect(() => {
  //   console.log(input);
  //   // Set debouncedValue to value (passed in) after the specified delay
  //   const handler = setTimeout(() => {
  //     getSearchResults(input);
  //   }, 200);

  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [input]);

  const onInputChange = event => {
    setInput(event.target.value);
    event.target.value !== ""
      ? getSearchResults(event.target.value)
      : setSearchResults(books);
    // getSearchResults(event.target.value);
  };

  return (
    <div>
      <Layout>
        <Container component='section' disableGutters={true} maxWidth={false}>
          <HeroCarousel
            randomBook={books[randomBookIndex]}
            mostFavBook={books[books.findIndex(book => book.id == mostFavId)]}
            highestRatedBook={
              books[books.findIndex(book => book.id == highestRatedId)]
            }
          />
        </Container>
        <Container component='main' maxWidth={false}>
          <SearchBar
            placeholderText={"Find your books"}
            buttonText={"Add"}
            input={input}
            onChange={onInputChange}
            onClick={event => {
              event.preventDefault();
              redirectToAdd();
            }}
          />

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

  return Promise.all([books, mostFavId, highestRatedId]).then(res => {
    const books = res[0].rows;
    const mostFavId = res[1][0].id;
    const highestRatedId = res[2][0].id;
    const randomBookIndex = Math.floor(Math.random() * books.length);

    console.log(res);
    return { props: { books, mostFavId, highestRatedId, randomBookIndex } };
  });
}

export default Community;
