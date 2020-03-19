import React, { useState, useEffect } from "react";
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
      margin: "auto",
      width: "100%"
    },
    input: {
      flex: 1,
      width: "80%",
      margin: 10
    },
    button: {
      margin: 10
    },
    iconButton: {
      padding: 10
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
        <SearchIcon className={classes.iconButton} aria-label='search' />
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={event => {
            event.preventDefault();
            props.onClick();
          }}>
          ADD
        </Button>
      </Paper>
    </section>
  );
}
