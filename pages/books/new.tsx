import React, { useState } from "react";
import BookNew from "../../src/components/BookNew";
import SearchBar from "../../src/components/SearchBar";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

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

const AddBook = props => {
  return (
    <main>
      <div>
        <SearchBar />
      </div>
    </main>
  );
};

export default AddBook;
