// require("dotenv").config();
import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import SelectInput from "@material-ui/core/Select/SelectInput";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto"
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
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

export default function SearchGoogle() {
  const classes = useStyles();

  const [books, setBooks] = useState({ items: [] });

  const [searchTerm, setSearchTerm] = useState("");

  const [bookObj, setBookObj] = useState({});
  const [authorObj, setAuthorObj] = useState({});

  let API_URL = `https://www.googleapis.com/books/v1/volumes`;

  const fetchBooks = async () => {
    if (searchTerm.length % 3 === 0) {
      const searchResult = await axios.get(
        `${API_URL}?q=${searchTerm}&maxResults=3`
      );
      setBooks(searchResult.data);
    }
  };

  const onInputChange = event => {
    setSearchTerm(event.target.value);
    fetchBooks();
  };

  const onSubmitHandler = event => {};

  return (
    <section className={classes.root}>
      <Paper component='form' className={classes.paper}>
        <InputBase
          className={classes.input}
          placeholder='Search Google Books'
          value={searchTerm}
          onChange={onInputChange}
        />
        <IconButton
          type='submit'
          className={classes.iconButton}
          aria-label='search'>
          <SearchIcon />
        </IconButton>
      </Paper>
      {books.items.map((book, index) => {
        return (
          <article key={index}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase
                    className={classes.image}
                    onClick={event => {
                      setBookObj({
                        user_id: 10,
                        title: book.volumeInfo.title,
                        description: book.volumeInfo.description,
                        fiction: true,
                        yeart: "2011",
                        image_url: book.volumeInfo.imageLinks.thumbnail
                      });

                      setAuthorObj({
                        name: book.volumeInfo.authors[0]
                      });
                      console.log(bookObj, authorObj);
                    }}>
                    <img
                      className={classes.img}
                      alt='complex'
                      src={book.volumeInfo.imageLinks.thumbnail}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction='column' spacing={2}>
                    <Grid>
                      <Grid item xs={6}>
                        <Typography gutterBottom variant='subtitle1'>
                          {book.volumeInfo.title}
                        </Typography>
                      </Grid>
                      <Typography variant='subtitle1' color='textSecondary'>
                        {book.volumeInfo.authors}
                      </Typography>
                      <Typography variant='body2' gutterBottom>
                        {book.volumeInfo.description.split(".")[0]}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button variant='contained' color='primary' type='submit'>
                        <Typography variant='body2'>Add Book</Typography>
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant='subtitle1' color='textSecondary'>
                      {book.volumeInfo.publishedDate}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </article>
        );
      })}
    </section>
  );
}
