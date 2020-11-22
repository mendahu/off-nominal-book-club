import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import { useDebounce } from '../../../hooks/useDebounce/useDebounce';
import { ApiBook, ApiTag } from '../../../types/api/apiTypes';
import fuseConfig from './config';

export interface SearchTag extends ApiTag {
  selected?: boolean;
}

let bookSearcher;
let tagSearcher;

export const useSearch = () => {
  const initialSearch = {
    loading: true,
    books: [] as ApiBook[],
  };

  const initialTags = {
    loading: true,
    tags: [] as SearchTag[],
  };

  let bookSource = useRef([] as ApiBook[]);
  let tagSource = useRef([] as ApiTag[]);

  const [books, setBooks] = useState(initialSearch);
  const [tags, setTags] = useState(initialTags);
  const [selectedTag, setSelectedTag] = useState<string>();

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  const getSearchResults = async (
    term,
    bookSearch: Fuse<ApiBook>,
    tagSearch: Fuse<ApiTag>
  ) => {
    setBooks({ ...books, loading: true });
    setTags({ ...tags, loading: true });

    const bookResults = await bookSearch
      .search(term, { limit: 10 })
      .map((item) => item.item);

    const tagResults = await tagSearch.search(term).map(({ item }) => {
      return item.label === selectedTag ? { ...item, selected: true } : item;
    });

    setBooks({ loading: false, books: bookResults });
    setTags({ loading: false, tags: tagResults });
  };

  useEffect(() => {
    const booksResponse = axios.get<ApiBook[]>('/api/books');
    const tagResponse = axios.get<ApiTag[]>('/api/tags');

    Promise.all([booksResponse, tagResponse]).then((res) => {
      const books = res[0].data;
      const tags = res[1].data;

      bookSource.current = books;
      tagSource.current = tags;

      bookSearcher = new Fuse(books, fuseConfig.bookOptions);
      tagSearcher = new Fuse(tags, fuseConfig.tagOptions);

      setBooks({ loading: false, books });
      setTags({ loading: false, tags });
    });
    //TODO add catch
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      getSearchResults(
        debouncedSearchTerm,
        bookSearcher as Fuse<ApiBook>,
        tagSearcher as Fuse<ApiTag>
      );
    } else {
      setBooks({ ...books, books: bookSource.current });
      setTags({ ...tags, tags: tagSource.current });
    }
  }, [debouncedSearchTerm]);

  const selectTag = (label: string) => {
    setSelectedTag(label);
    setSearchTerm(label);
  };

  return {
    books,
    input: {
      set: setSearchTerm,
      value: searchTerm,
    },
    tags,
    selectTag,
  };
};

export default useSearch;
