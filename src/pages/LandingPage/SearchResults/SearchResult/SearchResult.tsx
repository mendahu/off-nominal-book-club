import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Avatar, Chip, Typography, Paper } from '@material-ui/core';
import Link from 'next/link';
import MatLink from '@material-ui/core/Link';
import urlGenerator from '../../../../helpers/urlGenerator';
import { BookStats } from '../../../../components/BookStats/BookStats';
import { MetaFlagData } from '../../../../components/BookStats/MetaFlags/MetaFlags';
import { AutocompleteTag } from '../../../../types/apiTypes';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  content: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: '1 0 293px',
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
  chip: {
    margin: theme.spacing(0.5, 0.5),
  },
  desc: {
    [theme.breakpoints.down(400)]: {
      display: 'none',
    },
  },
}));

const generateMetaData = (
  metaData: MetaData,
  userData?: MetaData
): MetaFlagData => {
  return {
    reads: {
      id: userData?.reads,
      count: Number(metaData.reads) || 0,
      loading: false,
    },
    wishlist: {
      id: userData?.wishlist,
      count: Number(metaData.wishlist) || 0,
      loading: false,
    },
    favourites: {
      id: userData?.favourites,
      count: Number(metaData.favourites) || 0,
      loading: false,
    },
  };
};

export type MetaData = {
  reads: number;
  wishlist: number;
  favourites: number;
};

export type SearchResultProps = {
  id: number;
  title: string;
  description: string;
  authorString: string;
  thumbnail: string;
  year: string;
  tags: AutocompleteTag[];
  rating: string;
  metaData: MetaData;
  userMetaData: MetaData;
  selectTag: () => void;
};

export const SearchResult = ({
  id,
  title,
  description,
  authorString,
  thumbnail,
  year,
  tags,
  rating,
  metaData,
  userMetaData,
  selectTag,
}) => {
  const classes = useStyles();

  const truncatedDescription = description.slice(0, 100) + '...';
  const urlString = authorString && urlGenerator(id, authorString, title);

  return (
    <Paper className={classes.root}>
      <Link href={`/books/[id]`} as={`/books/${urlString}`} passHref>
        <a>
          <img src={thumbnail} alt={title} />
        </a>
      </Link>

      <div className={classes.content}>
        <Link href={`/books/[id]`} as={`/books/${urlString}`} passHref>
          <MatLink color="inherit" underline="none">
            <Typography
              variant="body1"
              component="h2"
              className={classes.title}
            >
              {title}
            </Typography>
          </MatLink>
        </Link>
        <Typography variant="body2" paragraph={true} color="textSecondary">
          {authorString} - {year}
        </Typography>
        <Typography paragraph={true} className={classes.desc}>
          {truncatedDescription}
        </Typography>

        <div>
          {tags &&
            tags.map((tag, index) => (
              <Chip
                size="small"
                className={classes.chip}
                key={index}
                label={`#${tag.label}`}
                onClick={selectTag}
                avatar={<Avatar>{tag.count}</Avatar>}
              />
            ))}
        </div>
      </div>

      <BookStats
        ratingString={rating || '-'}
        bookId={id}
        metaData={generateMetaData(metaData, userMetaData)}
      />
    </Paper>
  );
};

export default SearchResult;
