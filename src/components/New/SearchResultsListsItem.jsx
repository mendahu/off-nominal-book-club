import React from "react";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

import { Card, CardContent } from "@material-ui/core";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      margin: theme.spacing(2, 0),
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between"
    },
    content: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      flex: "1 0 300px",
      order: 2,
      [theme.breakpoints.down("xs")]: {
        order: 3,
        flex: "1 0 100%"
      }
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

export default function SearchResultsListItem(props) {
  const classes = useStyles();

  return (
    <form key={props.key} onSubmit={props.onSubmit}>
      <Card className={classes.root}>
        <img alt={props.book.title} src={props.book.image_url} />
        <CardContent className={classes.content}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction='column' spacing={2}>
              <Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom variant='subtitle1'>
                    {props.book.title}
                  </Typography>
                </Grid>
                <Typography variant='subtitle1' color='textSecondary'>
                  {props.book.author && props.book.author[0]}
                </Typography>
                <Typography variant='body2' gutterBottom>
                  {props.book.description.split(".")[0]}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  onClick={() => {
                    // if in search onClick, set searchTerm and selectBook
                    {
                      props.mode === "SEARCH" &&
                        props.setTerm(props.book.title);
                      const authorsArr = props.book.author.map(a => {
                        return { name: a };
                      });
                      props.selectBook({
                        book: {
                          user_id: 10,
                          title: props.book.title,
                          description: props.book.description,
                          fiction: true,
                          year: props.book.year,
                          image_url: props.book.image_url,
                          google_id: props.book.google_id,
                          isbn13: props.book.isbn13
                        },
                        authors: authorsArr
                      });
                    }
                    // if in CONFIRM, onClick, setBookId
                    {
                      props.mode === "CONFIRM" &&
                        props.setBookId(props.results[props.index].id);
                    }
                  }}>
                  <Typography variant='body2'>{props.buttonText}</Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1' color='textSecondary'>
                {props.book.year}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
}
