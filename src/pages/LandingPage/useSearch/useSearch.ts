import { useState, useEffect } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import { bookOptions, tagOptions } from '../../../../config/search.json';
import { useDebounce } from '../../../hooks/useDebounce/useDebounce';

export const useSearch = () => {
  const initialSearch = {
    loading: true,
    results: [],
  };

  const initialTags = {
    loading: true,
    tags: [],
  };

  const [search, setSearch] = useState(initialSearch);
  const [tags, setTags] = useState(initialTags);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  let allBooks = [];
  let allTags = [];

  let bookSearcher;
  let tagSearcher;

  const getSearchResults = async (term, bookSearch, tagSearch) => {
    setSearch({ ...search, loading: true });
    setTags({ ...tags, loading: true });

    const bookData = await bookSearch
      .search(term)
      .slice(0, 5)
      .map((item) => {
        return item.item;
      });
    const tagsData = await tagSearch.search(term).map((tag) => {
      return tag.item;
    });

    setSearch({ loading: false, results: bookData });
    setTags({ loading: false, tags: tagsData });
  };

  useEffect(() => {
    const booksResponse = axios.get('/api/books/');
    const tagResponse = axios.get('/api/tags');

    Promise.all([booksResponse, tagResponse]).then((res) => {
      const books = res[0].data;
      const tags = res[1].data;

      allBooks = [...books];
      allTags = [...tags];

      bookSearcher = new Fuse(allBooks, bookOptions);
      tagSearcher = new Fuse(allTags, tagOptions);

      setSearch({ loading: false, results: books });
      setTags({ loading: false, tags });
    });
  }, []);

  useEffect(() => {
    debouncedSearchTerm &&
      getSearchResults(debouncedSearchTerm, bookSearcher, tagSearcher);
  }, [debouncedSearchTerm]);

  return {
    search,
    input: {
      set: setSearchTerm,
      value: searchTerm,
    },
    tags,
  };
};

export default useSearch;
