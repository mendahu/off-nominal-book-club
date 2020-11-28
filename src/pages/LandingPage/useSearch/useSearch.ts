import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import { useDebounce } from '../../../hooks/useDebounce/useDebounce';
import { ApiBook, ApiTag } from '../../../types/api/apiTypes';
import fuseConfig from './config';
import { BookType } from '../../../types/common.d';

export interface SearchTag extends ApiTag {
  selected?: boolean;
}

export type BookFilters = {
  showFiction: boolean;
  showNonFiction: boolean;
  showTextbook: boolean;
};

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

  const initialFilters: BookFilters = {
    showFiction: true,
    showNonFiction: true,
    showTextbook: true,
  };

  let bookSource = useRef([] as ApiBook[]);
  let tagSource = useRef([] as ApiTag[]);

  const [books, setBooks] = useState(initialSearch);
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [tags, setTags] = useState(initialTags);
  const [selectedTag, setSelectedTag] = useState<string>();
  const [filters, setFilters] = useState<BookFilters>(initialFilters);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  const handleFilterChange = (type: BookType) => {
    const newFilters = { ...filters };
    switch (type) {
      case BookType.fiction:
        newFilters.showFiction = !filters.showFiction;
        break;
      case BookType.nonFiction:
        newFilters.showNonFiction = !filters.showNonFiction;
        break;
      case BookType.textbook:
        newFilters.showTextbook = !filters.showTextbook;
        break;
    }
    setFilters(newFilters);
  };

  // Change results to match a new search query
  const getSearchResults = async (
    term,
    bookSearch: Fuse<ApiBook>,
    tagSearch: Fuse<ApiTag>
  ) => {
    setBooks({ ...books, loading: true });
    setTags({ ...tags, loading: true });

    const bookResults = await bookSearch.search(term).map((item) => item.item);

    const tagResults = await tagSearch.search(term).map(({ item }) => {
      return item.label === selectedTag ? { ...item, selected: true } : item;
    });

    setBooks({ loading: false, books: bookResults });
    setTags({ loading: false, tags: tagResults });
  };

  // Initial render, fetches all books and all tags to form baseline against which we search
  useEffect(() => {
    const booksResponse = axios.get<ApiBook[]>('/api/books');
    const tagResponse = axios.get<ApiTag[]>('/api/tags?sort=count');

    booksResponse
      .then((res) => {
        const books = res.data;
        bookSource.current = books;
        bookSearcher = new Fuse(books, fuseConfig.bookOptions);
        setBooks({ loading: false, books });
      })
      .catch((err) => {
        bookSearcher = new Fuse([], fuseConfig.bookOptions);
        setBooks({ loading: false, books: [] });
      });

    tagResponse
      .then((res) => {
        const tags = res.data;
        tagSource.current = tags;
        tagSearcher = new Fuse(tags, fuseConfig.tagOptions);
        setTags({ loading: false, tags });
      })
      .catch((err) => {
        tagSearcher = new Fuse([], fuseConfig.tagOptions);
        setTags({ loading: false, tags: [] });
      });
  }, []);

  // Handles a change in the search term or filter
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
  }, [debouncedSearchTerm, filters]);

  const selectTag = (label: string) => {
    setSelectedTag(label);
    setSearchTerm(label);
  };

  // handles changes to filters and filters the results
  useEffect(() => {
    const filterResults = (
      filters: BookFilters,
      results: ApiBook[]
    ): ApiBook[] => {
      return results.filter((result) => {
        switch (result.type) {
          case BookType.fiction:
            if (filters.showFiction) {
              return true;
            }
            break;
          case BookType.nonFiction:
            if (filters.showNonFiction) {
              return true;
            }
            break;
          case BookType.textbook:
            if (filters.showTextbook) {
              return true;
            }
            break;
        }
      });
    };

    const limitResults = (results: ApiBook[]): ApiBook[] => {
      return results.slice(0, 10);
    };

    setFilteredBooks({
      ...books,
      books: limitResults(filterResults(filters, books.books)),
    });
  }, [books, filters]);

  return {
    books: filteredBooks,
    input: {
      set: setSearchTerm,
      value: searchTerm,
    },
    tags,
    selectTag,
    filters: {
      set: handleFilterChange,
      value: filters,
    },
  };
};

export default useSearch;
