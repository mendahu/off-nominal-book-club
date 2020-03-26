import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme =>
  createStyles({
    paper: {
      display: "flex",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      margin: "auto",
      width: "100%"
    },
    text: {
      flex: 1,
      width: "80%",
      margin: 10
    },
    button: {
      margin: 10
    }
  })
);

export default function ConfirmResults(props) {
  const classes = useStyles();

  return (
    <Box component='section'>
      <Paper component='form' className={classes.paper}>
        <Typography className={classes.text}>
          Are one of these books what you were looking for?
        </Typography>
        <Button
          onClick={event => {
            event.preventDefault();
            props.onClick(props.book);
          }}
          className={classes.button}
          variant='contained'
          color='primary'>
          No, Add Book
        </Button>
      </Paper>
    </Box>
  );
}
