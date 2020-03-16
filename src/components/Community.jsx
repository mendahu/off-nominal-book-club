import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row"
  },
  image: {
    width: 128,
    height: 128
  },
  row: {
    flexDirection: "row"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
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

export default function Community() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <section>
      <Card className={classes.root}>
        <CardMedia>
          <img
            className={classes}
            src='http://books.google.com/books/content?id=kPmLDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
          />
        </CardMedia>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <div className={classes.row}>
              <Typography component='h5' variant='h5'>
                The Martian
              </Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                2011
              </Typography>
            </div>
            <Typography variant='subtitle1' color='textSecondary'>
              Andy Weir
            </Typography>
          </CardContent>
        </div>
      </Card>
    </section>
  );
}
{
  /* <CardMedia className={classes.media}>
  <img src='http://books.google.com/books/content?id=kPmLDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' />
</CardMedia>; */
}
