import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import StarBorder from "@material-ui/icons/StarBorder";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row"
  },
  image: {
    width: "25%"
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
    flex: "1 0 auto"
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

export default function BookListItem() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <article>
      <Card className={classes.root}>
        <CardMedia className={classes.image}>
          <img
            className={classes}
            src='http://books.google.com/books/content?id=kPmLDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
          />
        </CardMedia>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <CardContent className={classes.row}>
              <Typography className={classes.title} component='h5' variant='h5'>
                The Martian
              </Typography>
              <StarBorder />
              <Typography
                className={classes.year}
                variant='subtitle1'
                color='textSecondary'>
                4.5
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
                2011
              </Typography>
            </CardContent>
            <Typography variant='subtitle1' color='textSecondary'>
              The Martian is a 2011 science fiction novel written by Andy Weir.
              It was his debut novel under his own name.
            </Typography>
          </CardContent>
        </div>
      </Card>
    </article>
  );
}
