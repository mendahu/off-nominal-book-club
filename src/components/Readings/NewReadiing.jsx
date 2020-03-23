import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  CardMedia,
  CardContent,
  Card,
  Button
} from "@material-ui/core";

import axios from "axios";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    marginTop: "1vh",
    height: "25vh"
  },
  imageContainer: {
    display: "flex",
    width: "17%",
    padding: 0
  },
  thumb_image: {
    margin: "auto",
    maxHeight: "13vh",
    maxWidth: "10vh"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    padding: "0",
    justifyContent: "space-between"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "78%"
  },
  title: {
    width: "90%",
    fontSize: "2vh"
  },
  author: {
    width: "90%",
    fontSize: "1.5vh"
  },
  year: {
    width: "10%",
    alignSelf: "flex-end"
  },
  button: {
    height: "3vh"
  }
}));

export default function NewReading(props) {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    const readingData = {
      bookId: props.bookId,
      userId: props.userId,
      dateStarted: startDate,
      dateEnded: endDate
    };
    axios
      .post(`/api/readings/new`, readingData)
      .then(res => {
        const readingId = res.data[0];
        axios.post(`/api/readings/users`, {
          readingId: readingId,
          userId: props.userId
        });
        return readingId;
      })
      .then(readingId => router.push(`/readings/${readingId}`));
  }
  return (
    <form
      onSubmit={event => {
        onSubmit(event);
      }}>
      <Paper>
        <Card className={classes.root}>
          <CardContent className={classes.imageContainer}>
            <CardMedia className={classes.thumb_image}>
              <img className={classes.thumb_image} src={props.book.image_url} />
            </CardMedia>
          </CardContent>
          <CardContent className={classes.content}>
            <CardContent className={classes.row}>
              <Typography className={classes.title} component='h5' variant='h5'>
                {props.book.title}
              </Typography>
            </CardContent>
            <CardContent className={classes.row}>
              {props.book.authors &&
                props.book.authors.map((author, index) => (
                  <Typography className={classes.author} variant='subtitle1'>
                    {author}
                  </Typography>
                ))}
              <Typography
                className={classes.year}
                variant='subtitle1'
                color='textSecondary'>
                {props.book.year}
              </Typography>
            </CardContent>
            <CardContent className={classes.row}>
              <Typography
                className={classes.year}
                variant='subtitle1'
                color='textSecondary'>
                START DATE:
              </Typography>
              <DatePicker selected={startDate} onChange={setStartDate} />
              <Typography
                className={classes.year}
                variant='subtitle1'
                color='textSecondary'>
                END DATE:
              </Typography>
              <DatePicker selected={endDate} onChange={setEndDate} />
            </CardContent>
            <Button
              className={classes.button}
              type='submit'
              color='primary'
              variant='contained'>
              CREATE
            </Button>
          </CardContent>
        </Card>
      </Paper>
    </form>
  );
}
