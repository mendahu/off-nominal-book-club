import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Paper, CardContent, Card, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    height: "5vh",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "1vh"
  },
  title: {
    width: "60%",
    alignSelf: "flex-start",
    padding: 0,
    margin: "auto"
  },
  author: {
    width: "auto",
    alignSelf: "flex-end",
    padding: 0,
    margin: "auto"
  }
}));

export default function UserBookListItem(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.title}>
        <Typography>{props.book.title}</Typography>
      </CardContent>
      <CardContent className={classes.author}>
        <Typography>{props.book.authors[0]}</Typography>
      </CardContent>
    </Card>
  );
}
