import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Chip,
  Typography,
  CardContent,
  Card,
  Box
} from "@material-ui/core";
import Star from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Link from "next/link";
import urlGenerator from '../../helpers/urlGenerator'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2, 0),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  flex: {
    display: "flex"
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
  title: {
    fontSize: "1rem",
    [theme.breakpoints.up(450)]: {
      fontSize: "1.2rem"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem"
    }
  },
  authors: {
    fontSize: "0.875rem",
    fontStyle: "italic",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.2rem"
    }
  },
  stats: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    order: 3,
    minWidth: 100,
    [theme.breakpoints.down("xs")]: {
      order: 2
    }
  },
  stat: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: theme.spacing(1)
  },
  statNumber: {
    marginLeft: 4,
    fontSize: "1rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.2rem"
    }
  },
  chip: {
    margin: theme.spacing(0.5, 0.5)
  },
  desc: {
    [theme.breakpoints.down(400)]: {
      display: "none"
    }
  }
}));

export default function BookListItem(props) {
  const classes = useStyles();

  const authorString = JSON.parse(props.book.authors).join(", ");
  const description = props.book.description.slice(0, 100) + "...";

  const urlString = urlGenerator(props.book.id, authorString, props.book.title)

  return (
    <Card className={classes.root}>
      <Link href={`/books/[id]`} as={`/books/${urlString}`} passHref>
        <img src={props.book.image_url} alt={props.book.title} />
      </Link>

      <CardContent className={classes.content}>
        <Typography variant='body1' component='h2' className={classes.title}>
          {props.book.title}
        </Typography>
        <Typography
          variant='body2'
          paragraph={true}
          className={classes.authors}
          color='textSecondary'>
          {authorString} - {props.book.year}
        </Typography>
        <Typography paragraph={true} className={classes.desc}>
          {description}
        </Typography>

        <Box>
          {props.book.tags &&
            JSON.parse(props.book.tags)
              .slice(0, 4)
              .map((tag, index) => (
                <Chip
                  size='small'
                  className={classes.chip}
                  key={index}
                  label={tag.tag_name}
                  onClick={() => props.selectTag(tag.tag_name)}
                  avatar={<Avatar>{tag.count}</Avatar>}
                />
              ))}
        </Box>
      </CardContent>

      <CardContent className={classes.stats}>
        <Box className={classes.stat}>
          <Star htmlColor='#ffd54f' />
          <Typography component='h3' className={classes.statNumber}>
            {props.book.avg_rating || "-"}
          </Typography>
        </Box>

        <Box className={classes.stat}>
          <FavoriteIcon htmlColor='#e57373' />
          <Typography component='h3' className={classes.statNumber}>
            {props.book.fav_count || "-"}
          </Typography>
        </Box>

        <Box className={classes.stat}>
          <CheckCircleIcon htmlColor='#64b5f6' />
          <Typography component='h3' className={classes.statNumber}>
            {props.book.read_count || "-"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
