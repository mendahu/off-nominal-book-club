import { Container } from "@material-ui/core";
import SearchBar from "../src/components/SearchBar";
import BookList from "../src/components/Landing/BookList";
import TagList from "../src/components/Landing/TagList";
import HeroCarousel from "../src/components/Landing/HeroCarousel";
import React, { useState } from "react";
import Layout from "../src/components/LandingLayout";
import axios from "axios";
const queries = require("../db/queries/books");
import Fuse from "fuse.js";
import { bookOptions, tagOptions } from '../config/search.json'

export default function App(props) {

  const {
    books,
    tags,
    mostFavId,
    highestRatedId,
    randomBookIndex
  } = props;

  const bookSearch = books ? new Fuse(books, bookOptions) : null;
  const tagSearch = tags ? new Fuse(tags, tagOptions) : null;

  const [searchResults, setSearchResults] = useState(books);
  const [tagList, setTagList] = useState(tags);
  const [input, setInput] = useState("");

  async function getSearchResults(term) {
    const bookData = await bookSearch
      .search(term)
      .slice(0, 5)
      .map(item => {
        return item.item;
      });
    const tagsData = await tagSearch.search(term).map(tag => {
      return tag.item;
    });

    setSearchResults(bookData);
    setTagList(tagsData);
  }

  async function selectTag(tag) {
    const bookData = await axios.get(`/api/tags/${tag}`);
    setSearchResults(bookData.data);
  }

  const onInputChange = event => {
    setInput(event.target.value);
    event.target.value !== ""
      ? getSearchResults(event.target.value)
      : setSearchResults(books);
  };

  const clearResults = (e) => {
    e.preventDefault();
    setTagList(tags);
    setInput('');
    setSearchResults(books);
  }

  return (
    <div>
      <Layout>
        <Container component='section' disableGutters={true} maxWidth={false}>
          {books ? 
          <HeroCarousel
            randomBook={books[randomBookIndex]}
            mostFavBook={books[books.findIndex(book => book.id == mostFavId)]}
            highestRatedBook={books[books.findIndex(book => book.id == highestRatedId)]}
          />
          : <HeroCarousel />}
        </Container>
        <Container component='main' maxWidth={false}>

          <SearchBar
            placeholderText={"Find your books"}
            text={input}
            onChange={onInputChange}
            button={{ active: true, text: "Clear", onClick: clearResults }}
          />

          <TagList tags={tagList} onClick={selectTag} />

          <BookList
            books={searchResults}
            selectTag={selectTag}
          />
        </Container>
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const books = queries.books.getAll("");
  const tags = queries.books.getTags("");
  const mostFavId = queries.books.getMostFavourite();
  const highestRatedId = queries.books.getHighestRated();

  return Promise.all([books, tags, mostFavId, highestRatedId])
    .then(res => {
      const books = res[0].rows;
      const tags = res[1].rows;
      const mostFavId = res[2][0]?.id || null;
      const highestRatedId = res[3][0]?.id || null;
      const randomBookIndex = books.length ? Math.floor(Math.random() * books.length) : null;

      return {
        props: { books, tags, mostFavId, highestRatedId, randomBookIndex }
      };
    })
    .catch(err => console.error(err));
}
