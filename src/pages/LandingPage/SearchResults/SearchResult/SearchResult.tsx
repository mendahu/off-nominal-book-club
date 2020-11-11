import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Chip,
  Typography,
  CardContent,
  Card,
  Box,
} from '@material-ui/core';
import Link from 'next/link';
import MatLink from '@material-ui/core/Link';
import urlGenerator from '../../../../helpers/urlGenerator';
import { BookStats } from '../../../../components/BookStats/BookStats';
import { MetaFlagData } from '../../../../components/BookStats/MetaFlags/MetaFlags';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  flex: {
    display: 'flex',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: '1 0 300px',
    order: 2,
    [theme.breakpoints.down('xs')]: {
      order: 3,
      flex: '1 0 100%',
    },
  },
  title: {
    fontSize: '1rem',
    [theme.breakpoints.up(450)]: {
      fontSize: '1.2rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.5rem',
    },
  },
  authors: {
    fontSize: '0.875rem',
    fontStyle: 'italic',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.2rem',
    },
  },
  stats: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    order: 3,
    minWidth: 100,
    [theme.breakpoints.down('xs')]: {
      order: 2,
    },
  },
  stat: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: theme.spacing(1),
  },
  statNumber: {
    marginLeft: 4,
    fontSize: '1rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.2rem',
    },
  },
  chip: {
    margin: theme.spacing(0.5, 0.5),
  },
  desc: {
    [theme.breakpoints.down(400)]: {
      display: 'none',
    },
  },
}));

const generateMetaData = (book, userData?): MetaFlagData => {
  const metaData = {
    reads: {
      id: userData?.reads,
      count: Number(book.read_count) || 0,
      loading: false,
    },
    wishlist: {
      id: userData?.wishlist,
      count: Number(book.wishlist_count) || 0,
      loading: false,
    },
    favourites: {
      id: userData?.favourites,
      count: Number(book.fav_count) || 0,
      loading: false,
    },
  };
  return metaData;
};

export const SearchResult = (props) => {
  const classes = useStyles();

  const authorString = JSON.parse(props.book.authors).join(', ');
  const description = props.book.description.slice(0, 100) + '...';

  const urlString = urlGenerator(props.book.id, authorString, props.book.title);

  return (
    <Card className={classes.root}>
      <Link href={`/books/[id]`} as={`/books/${urlString}`} passHref>
        <a>
          <img src={props.book.image_url} alt={props.book.title} />
        </a>
      </Link>

      <CardContent className={classes.content}>
        <Link href={`/books/[id]`} as={`/books/${urlString}`} passHref>
          <MatLink color="inherit" underline="none">
            <Typography
              variant="body1"
              component="h2"
              className={classes.title}
            >
              {props.book.title}
            </Typography>
          </MatLink>
        </Link>
        <Typography
          variant="body2"
          paragraph={true}
          className={classes.authors}
          color="textSecondary"
        >
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
                  size="small"
                  className={classes.chip}
                  key={index}
                  label={`#${tag.tag_name}`}
                  onClick={() => props.selectTag(tag.tag_name)}
                  avatar={<Avatar>{tag.count}</Avatar>}
                />
              ))}
        </Box>
      </CardContent>

      <BookStats
        ratingString={props.book.avg_rating || '-'}
        bookId={props.book.id}
        metaData={generateMetaData(props.book, props.userMetaData)}
      />
    </Card>
  );
};

export default SearchResult;
