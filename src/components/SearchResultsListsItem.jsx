import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme =>
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

export default function SearchResultsListItem(props) {
  const classes = useStyles();

  const hasDescription = props.book.volumeInfo.description ? true : false;
  const hasImage = props.book.volumeInfo.imageLinks ? true : false;
  const hasPublishedDate = props.book.volumeInfo.publishedDate ? true : false;

  return (
    <form key={props.key} onSubmit={props.onSubmit}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase
              className={classes.image}
              onClick={event => {
                props.setTerm(props.book.volumeInfo.title);
                props.selectBook({
                  user_id: 10,
                  title: props.book.volumeInfo.title,
                  description: props.book.volumeInfo.description,
                  fiction: true,
                  year: props.book.volumeInfo.publishedDate.split("-")[0],
                  image_url: props.book.volumeInfo.imageLinks.thumbnail
                });

                props.selectAuthor({
                  name: props.book.volumeInfo.authors[0]
                });
              }}>
              <img
                className={classes.img}
                alt={props.book.volumeInfo.title}
                src={hasImage ? props.book.volumeInfo.imageLinks.thumbnail : ""}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction='column' spacing={2}>
              <Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom variant='subtitle1'>
                    {props.book.volumeInfo.title}
                  </Typography>
                </Grid>
                <Typography variant='subtitle1' color='textSecondary'>
                  {props.book.volumeInfo.authors}
                </Typography>
                <Typography variant='body2' gutterBottom>
                  {console.log(props.book.volumeInfo)}
                  {hasDescription
                    ? props.book.volumeInfo.description.split(".")[0]
                    : ""}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  onSubmit={event => {
                    console.log("here");
                    return axios
                      .post(`localhost:3000/books/new`, {
                        bookObj,
                        authorObj
                      })
                      .then(res => console.log(res));
                  }}>
                  <Typography variant='body2'>Add Book</Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1' color='textSecondary'>
                {hasPublishedDate
                  ? props.book.volumeInfo.publishedDate.split("-")[0]
                  : ""}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
}
