import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import {
  Paper,
  CardContent,
  Card,
  Typography,
  Button
} from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    width: "75vw"
  },
  card: {
    display: "flex",
    width: "100%",
    height: "5vh",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "1vh"
  },
  title: {
    width: "60%",
    alignSelf: "flex-start",
    margin: "auto"
  },
  author: {
    width: "auto",
    alignSelf: "flex-end",
    margin: "auto"
  }
}));

export default function UserBookListItem(props) {
  const classes = useStyles();

  return (
    <Button className={classes.root}>
      <Link href={`/books/${props.book.id}`}>
        <Card className={classes.card}>
          <CardContent className={classes.title}>
            <Typography>{props.book.title}</Typography>
          </CardContent>
          <CardContent className={classes.author}>
            <Typography variant='subtitle1' color='textSecondary'>
              {props.book.authors[0]}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Button>
  );
}
