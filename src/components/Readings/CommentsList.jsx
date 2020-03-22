import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import CommentsListItem from "./CommentsListItem";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "80vw",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

export default function CommentsList(props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {props.comments.map((comment, index) => (
        <CommentsListItem key={index} comment={comment} />
      ))}
    </List>
  );
}
