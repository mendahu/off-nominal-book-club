import { Container } from "@material-ui/core";
import SearchBar from "../src/components/SearchBar";
import BookList from "../src/components/CommunityView/BookList";
import TagList from "../src/components/CommunityView/TagList";
import HeroCarousel from "../src/components/CommunityView/HeroCarousel";
import React, { useState } from "react";
import Layout from "../src/components/LandingLayout";
import axios from "axios";
const queries = require("../db/queries/books");
import Router from "next/router";
import Fuse from "fuse.js";

function Community({
  books,
  tags,
  mostFavId,
  highestRatedId,
  randomBookIndex
}) {
  const bookOptions = {
    shouldSort: true,
    threshold: 0.7,
    location: 0,
    distance: 100,
    minMatchCharLength: 2,
    keys: [
      {
        name: "title",
        weight: 0.5
      },
      {
        name: "tags_string",
        weight: 0.3
      },
      {
        name: "authors_string",
        weight: 0.2
      }
    ]
  };

  const tagOptions = {
    shouldSort: true,
    threshold: 0.9,
    location: 0,
    distance: 100,
    minMatchCharLength: 2,
    keys: ["tag_name"]
  };

  const bookSearch = new Fuse(books, bookOptions);
  const tagSearch = new Fuse(tags, tagOptions);

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
    const bookData = await axios.get(`/api/community/tags/${tag}`);
    setSearchResults(bookData.data);
  }

  function redirectToBook(id) {
    Router.push(`/books/${id}`);
  }

  function redirectToAdd() {
    Router.push(`/books/new`);
  }

  const onInputChange = event => {
    setInput(event.target.value);
    event.target.value !== ""
      ? getSearchResults(event.target.value)
      : setSearchResults(books);
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
            buttonText={"Search"}
            input={input}
            onChange={onInputChange}
            buttonHref={'/community'}
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
  const tags = queries.books.getTags("");
  const mostFavId = queries.books.getMostFavourite();
  const highestRatedId = queries.books.getHighestRated();

  return Promise.all([books, tags, mostFavId, highestRatedId]).then(res => {
    const books = res[0].rows;
    const tags = res[1].rows;
    const mostFavId = res[2][0].id;
    const highestRatedId = res[3][0].id;
    const randomBookIndex = Math.floor(Math.random() * books.length)
    .catch(err => console.error(err));

    return {
      props: { books, tags, mostFavId, highestRatedId, randomBookIndex }
    };
  });
}

export default Community;
