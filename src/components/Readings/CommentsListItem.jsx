import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

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

export default function CommentsListItem(props) {
  const classes = useStyles();

  return (
    <article>
      <ListItem className={classes.root} alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar alt={props.comment.name} src={props.comment.avatar_url} />
        </ListItemAvatar>
        <ListItemText
          primary={props.comment.name}
          secondary={<React.Fragment>{props.comment.comment}</React.Fragment>}
        />
      </ListItem>
      <Divider variant='inset' component='li' />
    </article>
  );
}
