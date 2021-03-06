import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Avatar, Chip, Typography, Paper } from '@material-ui/core';
import Link from 'next/link';
import MatLink from '@material-ui/core/Link';
import urlGenerator from '../../../../helpers/urlGenerator';
import { BookStats } from '../../../../components/BookStats/BookStats';
import { MetaFlagData } from '../../../../components/BookStats/MetaFlags/MetaFlags';
import { ApiTag } from '../../../../types/api/apiTypes';
import { BookType } from '../../../../types/common';
import { BookThumbnail } from '../../../../components/BookThumbnail';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(2),
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
    fontSize: '1.1rem',
    [theme.breakpoints.up(450)]: {
      fontSize: '1.3rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.4rem',
    },
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  desc: {
    [theme.breakpoints.down(400)]: {
      display: 'none',
    },
  },
  typeTag: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
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
  reads: number | null;
  wishlist: number | null;
  favourites: number | null;
};

export type SearchResultProps = {
  id: number;
  title: string;
  description: string;
  authorString: string;
  googleId: string;
  type: BookType;
  year: string;
  tags: ApiTag[];
  rating: number;
  metaData: MetaData;
  userMetaData: MetaData | undefined;
  selectTag: (label: string) => void;
};

export const SearchResult = ({
  id,
  title,
  description,
  authorString,
  googleId,
  type,
  year,
  tags,
  rating,
  metaData,
  userMetaData,
  selectTag,
}: SearchResultProps) => {
  const classes = useStyles();

  const truncatedDescription = description.slice(0, 100) + '...';
  const urlString = authorString && urlGenerator(id, authorString, title);

  return (
    <Paper className={classes.root}>
      <Link href={`/books/${id}`} as={`/books/${urlString}`} passHref>
        <a>
          <BookThumbnail
            id={googleId}
            zoom={1}
            title={title}
            authorString={authorString}
          />
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

        <Typography variant="body2" color="textSecondary">
          {authorString} - {year}
        </Typography>
        <div>
          <Chip size="small" label={type} className={classes.typeTag} />
        </div>
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
                onClick={() => selectTag(tag.label)}
                avatar={<Avatar>{tag.count}</Avatar>}
              />
            ))}
        </div>
      </div>

      <BookStats
        ratingString={rating ? `${rating}` : '-'}
        bookId={id}
        metaData={generateMetaData(metaData, userMetaData)}
      />
    </Paper>
  );
};

export default SearchResult;
