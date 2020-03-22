import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

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
  name: {
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

export default function UserListItem(props) {
  const classes = useStyles();

  return (
    <Button className={classes.root}>
      <Link href={`/users/${props.user.id}`}>
        <Card className={classes.card}>
          <CardContent className={classes.name}>
            <Typography>{props.user.name}</Typography>
          </CardContent>
          <CardContent>
            <Avatar alt={props.user.name} src={props.user.avatar_url} />
          </CardContent>
        </Card>
      </Link>
    </Button>
  );
}
