import SearchResult from './SearchResult';
import { Box } from '@material-ui/core';
import { useUser } from '../../../../lib/user';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchResultsSkeleton from './skeletons/SearchResultsSkeleton';
import { ApiBook } from '../../../types/api/apiTypes';
import Message from '../../../components/Utility/Message';

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
  const { user } = useUser();
  const [userMetaData, setUserMetaData] = useState({});

  const userId = user?.onbc_id;

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
      ) : (
        <Message variant="warning" message="No results." />
      )}
    </Box>
  );
};

export default SearchResults;
