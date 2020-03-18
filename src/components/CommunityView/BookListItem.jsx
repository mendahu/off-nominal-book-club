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
  Card
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    marginTop: "5px"
  },
  imageContainer: {
    width: "18%",
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
    paddingTop: "0"
  },
  year: {
    width: "10%",
    alignSelf: "flex-end"
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  playIcon: {
    height: 38,
    width: 38
  }
}));

export default function BookListItem(props) {
  const classes = useStyles();
  const theme = useTheme();

  const arr = ["hello", "tag", "Jake"];
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
              <StarBorder />
              <Typography
                className={classes.year}
                variant='subtitle1'
                color='textSecondary'>
                4
              </Typography>
            </CardContent>
            <div className={classes.tags}>
              {props.book.tags &&
                props.book.tags
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
              {props.book.authors &&
                props.book.authors.map((author, index) => (
                  <Typography className={classes.title} variant='subtitle1'>
                    {author.name}
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
          </CardContent>
        </Card>
      </Paper>
    </form>
  );
}
