import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Link from "next/link";
import { Paper, Typography, Button, Container } from "@material-ui/core";

import axios from "axios";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import fromUnixTime from "date-fns/fromUnixTime";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    padding: 0,
    flexDirection: "row",
    height: "15vh",
    backgroundColor: theme.palette.grey["900"],
    backgroundImage:
      "url('https://www.transparenttextures.com/patterns/light-paper-fibers.png')",
    [theme.breakpoints.down("xs")]: {
      height: "30vh"
    }
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
    justifyContent: "center",
    width: "78%"
  },
  title: {
    width: "100%",
    fontSize: "2vh",
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.5vh"
    }
  },
  author: {
    width: "90%",
    fontSize: "1.5vh"
  },
  topButton: {
    display: "block",
    height: "3vh",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  bottomButton: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block",
      width: "100%"
    }
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingLeft: "0",
    paddingRight: "0",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      justifyContent: "center"
    }
  },
  startDate: {
    fontSize: "1.70vh",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5vh",
      marginTop: "4px",
      marginBottome: "0"
    }
  },
  endDate: {
    fontSize: "1.70vh",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5vh",
      marginTop: "0"
    }
  }
}));

export default function NewReading(props) {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();

  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());

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
    <Paper className={classes.root}>
      <Link href={`/books/${props.book.id}`}>
        <img src={props.book.image_url} />
      </Link>
      <Container className={classes.content}>
        <Container className={classes.row}>
          <Link href={`/books/${props.book.id}`}>
            <Typography className={classes.title} component='h5' variant='h5'>
              {props.book.title}
            </Typography>
          </Link>

          <form
            onSubmit={event => {
              onSubmit(event);
            }}>
            <Button
              className={classes.topButton}
              variant='contained'
              color='primary'
              type='submit'>
              <Typography variant='body2'>CREATE</Typography>
            </Button>
          </form>
        </Container>
        <Container className={classes.row}>
          {props.book.authors && (
            <Typography className={classes.author} variant='subtitle1'>
              {props.book.authors[0]} - {props.book.year}
            </Typography>
          )}
        </Container>
        <Container className={classes.dateContainer}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className={classes.startDate}
              disableToolbar
              variant='inline'
              format='yyyy-MM-dd'
              margin='normal'
              id='date-picker-inline'
              label='START DATE:'
              value={startDate}
              onChange={setStartDate}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
            <KeyboardDatePicker
              className={classes.endDate}
              disableToolbar
              variant='inline'
              format='yyyy-MM-dd'
              margin='normal'
              id='date-picker-inline'
              label='END DATE:'
              value={endDate}
              onChange={setEndDate}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
        </Container>

        <form
          onSubmit={event => {
            onSubmit(event);
          }}>
          <Button
            className={classes.bottomButton}
            variant='contained'
            color='primary'
            type='submit'>
            <Typography variant='body2'>CREATE</Typography>
          </Button>
        </form>
      </Container>
    </Paper>
  );
}
