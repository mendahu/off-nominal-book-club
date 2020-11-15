import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import { bookOptions, tagOptions } from '../../../../config/search.json';
import { useDebounce } from '../../../hooks/useDebounce/useDebounce';

let bookSearcher;
let tagSearcher;

export const useSearch = () => {
  const initialSearch = {
    loading: true,
    books: [],
  };

  const initialTags = {
    loading: true,
    tags: [],
  };

  let bookSource = useRef([]);
  let tagSource = useRef([]);

  const [books, setBooks] = useState(initialSearch);
  const [tags, setTags] = useState(initialTags);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  const getSearchResults = async (term, bookSearch, tagSearch) => {
    setBooks({ ...books, loading: true });
    setTags({ ...tags, loading: true });

    const bookResults = await bookSearch
      .search(term, { limit: 10 })
      .map((item) => item.item);

    const tagResults = await tagSearch.search(term).map((tag) => tag.item);

    setBooks({ loading: false, books: bookResults });
    setTags({ loading: false, tags: tagResults });
  };

  useEffect(() => {
    const booksResponse = axios.get('/api/books/');
    const tagResponse = axios.get('/api/tags');

    Promise.all([booksResponse, tagResponse]).then((res) => {
      const books = res[0].data;
      const tags = res[1].data;

      bookSource.current = books;
      tagSource.current = tags;

      bookSearcher = new Fuse(books, bookOptions);
      tagSearcher = new Fuse(tags, tagOptions);

      setBooks({ loading: false, books });
      setTags({ loading: false, tags });
    });
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      getSearchResults(debouncedSearchTerm, bookSearcher, tagSearcher);
    } else {
      setBooks({ loading: false, books: bookSource.current });
      setTags({ loading: false, tags: tagSource.current });
    }
  }, [debouncedSearchTerm]);

  return {
    books,
    input: {
      set: setSearchTerm,
      value: searchTerm,
    },
    tags,
  };
};

export default useSearch;
