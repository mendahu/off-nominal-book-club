import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex",
      flexGrow: 1,
      maxWidth: "auto"
    },
    paper: {
      display: "flex",
      padding: theme.spacing(2),
      margin: "auto",
      width: "100%"
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      width: "80%"
    },
    iconButton: {
      padding: 10
    },
    button: {
      margin: 10
    }
  })
);

export default function SearchGoogle(props) {
  const classes = useStyles();

  let API_URL = `https://www.googleapis.com/books/v1/volumes`;

  useEffect(() => {
    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      getSearchResults();
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [props.searchTerm]);

  const getSearchResults = async () => {
    const searchResult = await axios.get(
      `${API_URL}?q=${props.searchTerm}&maxResults=10`
    );
    const formatedResults = searchResult.data.items.map(book => ({
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors ? book.volumeInfo.authors : [""],
      fiction: false,
      year: book.volumeInfo.publishedDate
        ? book.volumeInfo.publishedDate.split("-")[0]
        : "",
      description: book.volumeInfo.description
        ? book.volumeInfo.description
        : "",
      image_url: book.volumeInfo.imageLinks
        ? book.volumeInfo.imageLinks.thumbnail
        : "",
      google_id: book.id,
      isbn13: book.volumeInfo.industryIdentifiers
        ? book.volumeInfo.industryIdentifiers[0].identifier
        : ""
    }));
    props.setResults(formatedResults);
  };

  const onInputChange = event => {
    props.setTerm(event.target.value);
  };

  return (
    <section className={classes.root}>
      <Paper component='form' className={classes.paper}>
        <InputBase
          className={classes.input}
          placeholder='Search Google Books'
          value={props.searchTerm}
          onChange={onInputChange}
        />
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={event => {
            event.preventDefault();
            props.onClick();
          }}>
          BACK
        </Button>
      </Paper>
    </section>
  );
}
