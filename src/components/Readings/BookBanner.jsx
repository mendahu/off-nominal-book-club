import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Typography, Container, Button } from "@material-ui/core";

import Link from "next/link";
import Axios from "axios";

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
      height: "25vh"
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
  date: {
    fontSize: "1.70vh",
    [theme.breakpoints.down("xs")]: {
      fontSize: "2vh"
    }
  }
}));

export default function BookBanner(props) {
  const classes = useStyles();

  function addUser(event) {
    event.preventDefault();
    Axios.post(`/api/readings/users`, {
      readingId: props.readingId,
      userId: props.userId
    })
      .then(() => {
        return Axios.get(`/api/readings/${props.readingId}`);
      })
      .then(res => {
        props.setUsers(res.data.users);
        return res.data.users;
      })
      .then(res => {
        const idArr = res.map(user => {
          return user.id;
        });
        props.setJoinedUsers(idArr);
      });
  }

  function deleteUser(event) {
    event.preventDefault();
    Axios.patch(`/api/readings/users`, {
      readingId: props.readingId,
      userId: props.userId
    })
      .then(() => {
        return Axios.get(`/api/readings/${props.readingId}`);
      })
      .then(res => {
        props.setUsers(res.data.users);
        return res.data.users;
      })
      .then(res => {
        props.setJoinedUsers(
          res.map(user => {
            return user.id;
          })
        );
      });
  }

  function parseDate(dateJSON) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    const dateArr = JSON.parse(dateJSON)
      .split("T")[0]
      .split("-");
    const year = dateArr[0].slice(2);
    const month = months[dateArr[1] - 1];
    const day = dateArr[2];

    return `${month} ${day}, '${year}`;
  }

  return (
    <Container className={classes.root}>
      <Link href={`/books/[id]`} as={`/books/${props.book.id}`} passHref>
        <img src={props.book.image_url} />
      </Link>
      <Container className={classes.content}>
        <Container className={classes.row}>
          <Link href={`/books/[id]`} as={`/books/${props.book.id}`} passHref>
            <Typography className={classes.title} component='h5' variant='h5'>
              {props.book.title}
            </Typography>
          </Link>
          {!props.joinedUsers.includes(Number(props.userId)) ? (
            <form
              onSubmit={event => {
                addUser(event);
              }}>
              <Button
                className={classes.topButton}
                variant='contained'
                color='primary'
                type='submit'>
                <Typography variant='body2'>JOIN</Typography>
              </Button>
            </form>
          ) : (
            <form
              onSubmit={event => {
                deleteUser(event);
              }}>
              <Button
                className={classes.topButton}
                variant='contained'
                color='primary'
                type='submit'>
                LEAVE
              </Button>
            </form>
          )}
        </Container>
        <Container className={classes.row}>
          {props.book.authors && (
            <Typography className={classes.author} variant='subtitle1'>
              {props.book.authors[0]} - {props.book.year}
            </Typography>
          )}
        </Container>
        <Container className={classes.dateContainer}>
          <Typography
            className={classes.date}
            component='h6'
            variant='subtitle1'
            color='textSecondary'>
            Started On: {parseDate(props.book.date_started)}
          </Typography>
          <Typography
            className={classes.date}
            variant='subtitle1'
            color='textSecondary'>
            Ends on: {parseDate(props.book.date_ended)}
          </Typography>
        </Container>
        {!props.joinedUsers.includes(Number(props.userId)) ? (
          <form
            onSubmit={event => {
              addUser(event);
            }}>
            <Button
              className={classes.bottomButton}
              variant='contained'
              color='primary'
              type='submit'>
              <Typography variant='body2'>JOIN</Typography>
            </Button>
          </form>
        ) : (
          <form
            onSubmit={event => {
              deleteUser(event);
            }}>
            <Button
              className={classes.bottomButton}
              variant='contained'
              color='primary'
              type='submit'>
              LEAVE
            </Button>
          </form>
        )}
      </Container>
    </Container>
  );
}
