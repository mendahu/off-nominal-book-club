import SearchResult from './SearchResult/SearchResult';
import { Box, CircularProgress } from '@material-ui/core';
import { useUser } from '../../../../lib/user';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const metaFlagMapper = (flagArray) => {
  const flagMap = {};

  flagArray.forEach((flag) => {
    flagMap[flag.id];
  });
};

export const SearchResults = ({ results, loading }) => {
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
        <CircularProgress />
      ) : (
        results.map((book, index) => (
          <SearchResult
            key={index}
            book={book}
            selectTag={() => {}}
            userMetaData={userMetaData[book.id]}
          />
        ))
      )}
    </Box>
  );
};

export default SearchResults;
