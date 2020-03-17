import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import StarBorder from "@material-ui/icons/StarBorder";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Paper from "@material-ui/core/Paper";

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
  details: {
    display: "flex",
    flexDirection: "column",
    width: "75%"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-end",
    width: "78%"
  },
  cover: {
    width: 151
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
  playIcon: {
    height: 38,
    width: 38
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
              <StarBorder />
              <Typography
                className={classes.year}
                variant='subtitle1'
                color='textSecondary'>
                4
              </Typography>
            </CardContent>
            <ButtonGroup className={classes.tags}>
              <Button>
                <Typography>Mars</Typography>
              </Button>
              <Button>
                <Typography>Space</Typography>
              </Button>
              <Button>
                <Typography>Fiction</Typography>
              </Button>
              <Button>
                <Typography>Science Fiction</Typography>
              </Button>
            </ButtonGroup>
            <CardContent className={classes.row}>
              <Typography className={classes.title} variant='subtitle1'>
                Andy Weir
              </Typography>
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
