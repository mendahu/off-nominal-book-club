import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: "auto"
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      width: 900
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

export default function SearchDatabase(props) {
  const classes = useStyles();

  const [input, setInput] = useState("");

  useEffect(() => {
    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      props.setSearchTerm(input);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [input]);

  const onInputChange = event => {
    setInput(event.target.value);
  };

  return (
    <section className={classes.root}>
      <Paper component='form' className={classes.paper}>
        <InputBase
          className={classes.input}
          placeholder='Search'
          value={input}
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
