import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

import {
  Paper,
  CardContent,
  Card,
  Typography,
  Button,
  Avatar
} from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    width: "100%"
  },
  card: {
    display: "flex",
    width: "100%",
    height: "6vh",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    width: "60%",
    alignSelf: "flex-start",
    margin: "auto"
  },
  secondary: {
    width: "auto",
    alignSelf: "flex-end",
    margin: "auto"
  },
  text: {
    fontSize: "1"
  }
}));

export default function UserBookListItem(props) {
  const classes = useStyles();

  return (
    <Button className={classes.root}>
      <Link href={`${props.link}/${props.item.id}`}>
        <Card className={classes.card}>
          <CardContent>
            <Avatar
              alt={props.item[props.displayData.title]}
              src={props.item[props.displayData.image]}
            />
          </CardContent>
          <CardContent className={classes.title}>
            <Typography>{props.item[props.displayData.title]}</Typography>
          </CardContent>
          {props.displayData.secondary && (
            <CardContent className={classes.secondary}>
              <Typography variant='subtitle1' color='textSecondary'>
                {props.item[props.displayData.secondary]}
              </Typography>
            </CardContent>
          )}
          {props.item.rating && (
            <CardContent className={classes.secondary}>
              <Rating name='read-only' value={props.item.rating} readOnly />
            </CardContent>
          )}
        </Card>
      </Link>
    </Button>
  );
}
