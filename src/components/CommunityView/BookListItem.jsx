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
    marginTop: "1vh",
    height: "15vh"
  },
  imageContainer: {
    display: "flex",
    width: "17%",
    padding: 0
  },
  thumb_image: {
    margin: "auto",
    height: "13vh"
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
  buttton: {
    height: "20px"
  },
  chip: {
    margin: ".3vh",
    height: "2vh",
    fontSize: "1.4vh"
  },
  chip_button: {
    margin: 0,
    padding: 0
  },
  chip_avatar: {
    maxHeight: "1.7vh",
    maxWidth: "1.7vh",
    fontSize: "1.4vh"
  },
  rating: {
    width: "10%",
    fontSize: "2vh",
    margin: "auto"
  },
  star: {
    margin: "auto"
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
            <CardMedia className={classes.thumb_image}>
              <img className={classes.thumb_image} src={props.book.image_url} />
            </CardMedia>
          </CardContent>
          <CardContent className={classes.content}>
            <CardContent className={classes.row}>
              <Typography className={classes.title} component='h5' variant='h5'>
                {props.book.title}
              </Typography>
              {props.book.avg_rating && <StarBorder className={classes.star} />}
              <Typography
                className={classes.rating}
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
                    <Button
                      className={classes.chip_button}
                      type='submit'
                      onClick={e => {
                        e.preventDefault();
                        props.selectTag(tag.tag_name);
                      }}>
                      <Chip
                        key={index}
                        label={tag.tag_name}
                        avatar={
                          <Avatar className={classes.chip_avatar}>
                            {tag.count}
                          </Avatar>
                        }
                        className={classes.chip}
                      />
                    </Button>
                  ))}
            </div>
            <CardContent className={classes.row}>
              {props.book.authors &&
                JSON.parse(props.book.authors).map((author, index) => (
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
