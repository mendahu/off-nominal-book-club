import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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

export default function ConfirmResults(props) {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <Paper component='form' className={classes.paper}>
        <Typography>
          Are one of these books what you were looking for?
        </Typography>
        <Button>No, Add Book</Button>
      </Paper>
    </section>
  );
}
