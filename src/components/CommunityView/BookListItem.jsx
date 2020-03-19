import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import StarBorder from "@material-ui/icons/StarBorder";
import {
  Avatar,
  Chip,
  Paper,
  Typography,
  CardMedia,
  CardContent,
  Card,
  Button
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    marginTop: "5px"
  },
  imageContainer: {
    display: "flex",
    width: "17%",
    alignSelf: "flex-start"
  },
  image: {
    alignSelf: "flex-start"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    padding: "0",
    justifyContent: "flex-end"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-end",
    width: "78%"
  },
  title: {
    width: "90%"
  },
  tags: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "0",
    flexWrap: "wrap"
  },
  year: {
    width: "10%",
    alignSelf: "flex-end"
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  buttton: {
    height: "20px"
  }
}));

export default function BookListItem(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <form>
      <Paper>
        <Card className={classes.root}>
          <CardContent className={classes.imageContainer}>
            <CardMedia>
              <img src={props.book.image_url} />
            </CardMedia>
          </CardContent>
          <CardContent className={classes.content}>
            <CardContent className={classes.row}>
              <Typography className={classes.title} component='h5' variant='h5'>
                {props.book.title}
              </Typography>
              {props.book.avg_rating && <StarBorder />}
              <Typography
                className={classes.year}
                variant='subtitle1'
                color='textSecondary'>
                {props.book.avg_rating}
              </Typography>
            </CardContent>
            <div className={classes.tags}>
              {props.book.tags &&
                JSON.parse(props.book.tags)
                  .slice(0, 4)
                  .map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag.tag_name}
                      avatar={<Avatar>{tag.count}</Avatar>}
                      className={classes.chip}
                    />
                  ))}
            </div>
            <CardContent className={classes.row}>
              {console.log(props.book.authors)}
              {props.book.authors &&
                JSON.parse(props.book.authors).map((author, index) => (
                  <Typography className={classes.title} variant='subtitle1'>
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
            <Typography variant='subtitle1' color='textSecondary'>
              {props.book.description.split(".")[0]}
            </Typography>
            <Button
              className={classes.button}
              variant='contained'
              color='primary'
              type='submit'
              onClick={event => {
                event.preventDefault();
                props.onClick(props.book.id);
              }}>
              <Typography variant='body2'>{props.buttonText}</Typography>
            </Button>
          </CardContent>
        </Card>
      </Paper>
    </form>
  );
}
