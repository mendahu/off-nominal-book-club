import SearchResult from './SearchResult';
import { Box } from '@material-ui/core';
import { useUser } from '../../../../lib/user';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchResultsSkeleton from './skeletons/SearchResultsSkeleton';
import { Book } from '../../../types/apiTypes';

export const metaFlagMapper = (flagArray) => {
  const flagMap = {};

  flagArray.forEach((flag) => {
    flagMap[flag.id];
  });
};

export type SearchResultsProps = {
  results: Book[];
  loading: boolean;
  tagClickHandler: (label: string) => void;
};

export const SearchResults = ({
  results,
  loading,
  tagClickHandler,
}: SearchResultsProps) => {
  const { user } = useUser();
  const [userMetaData, setUserMetaData] = useState({});

  const userId = user?.onbc_id;

  useEffect(() => {
    if (userId) {
      axios.get(`/api/userdata/?userId=${userId}`).then((res) => {
        setUserMetaData(res.data);
      });
    }
  }, [userId]);

  return (
    <Box component="section">
      {loading ? (
        <SearchResultsSkeleton />
      ) : (
        results.map((book, index) => (
          <SearchResult
            key={index}
            id={book.id}
            title={book.title}
            description={book.description}
            authorString={book.authors_string}
            thumbnail={book.thumbnail}
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
        ))
      )}
    </Box>
  );
};

export default SearchResults;
