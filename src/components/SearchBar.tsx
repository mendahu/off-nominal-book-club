import React, { useState } from "react";
import axios from "axios";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto"
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    },
    image: {
      width: 128,
      height: 128
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%"
    }
  })
);

export default function SearchGoogle(props) {
  const classes = useStyles();

  let API_URL = `https://www.googleapis.com/books/v1/volumes`;

  const getSearchResults = async () => {
    if (props.searchTerm.length % 3 === 0) {
      const searchResult = await axios.get(
        `${API_URL}?q=${props.searchTerm}&maxResults=10`
      );
      props.setResults(searchResult.data);
    }
  };

  const onInputChange = event => {
    props.setTerm(event.target.value);
    getSearchResults();
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
        <IconButton
          type='submit'
          className={classes.iconButton}
          aria-label='search'>
          <SearchIcon />
        </IconButton>
      </Paper>
    </section>
  );
}
