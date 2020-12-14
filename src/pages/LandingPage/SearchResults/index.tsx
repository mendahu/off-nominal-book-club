import SearchResult from './SearchResult';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import { useUser } from '../../../../lib/user';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchResultsSkeleton from './skeletons/SearchResultsSkeleton';
import { ApiBook } from '../../../types/api/apiTypes';
import Message from '../../../components/Utility/Message';

export const RESULTS_CHUNK_SIZE = 15;

const useStyles = makeStyles((theme: Theme) => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export type SearchResultsProps = {
  results: ApiBook[];
  loading: boolean;
  tagClickHandler: (label: string) => void;
};

export const SearchResults = ({
  results = [],
  loading,
  tagClickHandler,
}: SearchResultsProps) => {
  const classes = useStyles();
  const { user } = useUser();
  const [userMetaData, setUserMetaData] = useState({});
  const [resultsLimit, setResultsLimit] = useState(RESULTS_CHUNK_SIZE);

  const userId = user?.onbc_id;

  const clickHandler = () => {
    setResultsLimit((prev) => prev + RESULTS_CHUNK_SIZE);
  };

  useEffect(() => {
    setResultsLimit(RESULTS_CHUNK_SIZE);
  }, [results]);

  useEffect(() => {
    if (userId) {
      axios.get(`/api/userdata?userId=${userId}`).then((res) => {
        setUserMetaData(res.data);
      });
    }
  }, [userId]);

  return (
    <Box component="section">
      {loading ? (
        <SearchResultsSkeleton />
      ) : results.length ? (
        results.map((book, index) => {
          if (index < resultsLimit) {
            return (
              <SearchResult
                key={index}
                id={book.id}
                title={book.title}
                description={book.description}
                authorString={book.authors_string}
                thumbnail={book.thumbnail}
                type={book.type}
                year={book.year}
                tags={book.tags}
                rating={book.rating}
                metaData={{
                  reads: book.reads,
                  wishlist: book.wishlist,
                  favourites: book.favourites,
                }}
                selectTag={tagClickHandler}
                userMetaData={userMetaData[book.id]}
              />
            );
          } else if (index === resultsLimit) {
            return (
              <div key={index} className={classes.buttonContainer}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={clickHandler}
                >
                  Load more
                </Button>
              </div>
            );
          }
        })
      ) : (
        <Message variant="warning" message="No results." />
      )}
    </Box>
  );
};

export default SearchResults;
