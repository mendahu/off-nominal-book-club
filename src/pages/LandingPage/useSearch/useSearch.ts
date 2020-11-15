import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import { useDebounce } from '../../../hooks/useDebounce/useDebounce';
import { Book, Tag } from '../../../types/apiTypes';
import fuseConfig from './config';

export interface SearchTag extends Tag {
  selected?: boolean;
}

let bookSearcher;
let tagSearcher;

export const useSearch = () => {
  const initialSearch = {
    loading: true,
    books: [] as Book[],
  };

  const initialTags = {
    loading: true,
    tags: [] as SearchTag[],
  };

  let bookSource = useRef([] as Book[]);
  let tagSource = useRef([] as Tag[]);

  const [books, setBooks] = useState(initialSearch);
  const [tags, setTags] = useState(initialTags);
  const [selectedTag, setSelectedTag] = useState<string>();

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  const getSearchResults = async (
    term,
    bookSearch: Fuse<Book>,
    tagSearch: Fuse<Tag>
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
    const booksResponse = axios.get<Book[]>('/api/books');
    const tagResponse = axios.get<Tag[]>('/api/tags');

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
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      getSearchResults(
        debouncedSearchTerm,
        bookSearcher as Fuse<Book>,
        tagSearcher as Fuse<Tag>
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
