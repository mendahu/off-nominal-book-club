import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import SearchResultsListItem from "./SearchResultsListsItem";

const useStyles = makeStyles(theme =>
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

export default function SearchResultsList(props) {
  const classes = useStyles();

  const onSubmitHandler = event => {
    console.log("here");
    return axios
      .post(`localhost:3000/books/new`, { bookObj, authorObj })
      .then(res => console.log(res));
  };

  return (
    <section>
      {props.results.items.map((book, index) => (
        <SearchResultsListItem
          key={index}
          onSubmit={onSubmitHandler}
          book={book}
          setTerm={props.setTerm}
          selectBook={props.selectBook}
          selectAuthor={props.selectAuthor}
        />
      ))}
    </section>
  );
}
