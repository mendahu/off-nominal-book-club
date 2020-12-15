import { renderHook, act } from '@testing-library/react-hooks';
import { useSearch } from '../useSearch';
import axios from 'axios';
import { ApiBook, ApiTag } from '../../../../types/api/apiTypes';
import { useDebounce } from '../../../../hooks/useDebounce/useDebounce';
import { BookType } from '../../../../types/common.d';
jest.mock('axios');
jest.mock('../../../../hooks/useDebounce/useDebounce');

useDebounce.mockImplementation((searchTerm, time) => searchTerm);

const mockFictionBook: ApiBook = {
  id: 5,
  title: 'a title',
  description: 'a long description of a book',
  year: '2001',
  google_id: `1234abcd`,
  type: BookType.fiction,
  reads: 7,
  wishlist: 5,
  favourites: 3,
  rating: 3.8,
  authors_string: 'Author 1, Author 2',
  tags: [
    {
      id: 1,
      count: 2,
      label: 'space',
    },
    {
      id: 3,
      count: 6,
      label: 'mars',
    },
    {
      id: 2,
      count: 1,
      label: 'planets',
    },
  ],
};

const mockNonFictionBook: ApiBook = {
  id: 3,
  title: 'a different book',
  description:
    'a long description of a book. it is much longer than the other one.',
  year: '2009',
  google_id: `1234abcd`,
  type: BookType.nonFiction,
  reads: 2,
  wishlist: 2,
  favourites: 1,
  rating: 3.1,
  authors_string: 'Author 3',
  tags: [
    {
      id: 1,
      count: 3,
      label: 'space',
    },
    {
      id: 6,
      count: 4,
      label: 'pluto',
    },
    {
      id: 2,
      count: 5,
      label: 'planets',
    },
  ],
};

const mockTextbook: ApiBook = {
  id: 7,
  title: 'a textbook',
  description:
    'a long description of a book. it is much longer than the other one. this is a textbook.',
  year: '2011',
  google_id: `1234abcd`,
  type: BookType.textbook,
  reads: 1,
  wishlist: 4,
  favourites: 1,
  rating: 3.7,
  authors_string: 'Author 4',
  tags: [
    {
      id: 1,
      count: 1,
      label: 'space',
    },
    {
      id: 4,
      count: 3,
      label: 'engineering',
    },
    {
      id: 5,
      count: 4,
      label: 'rockets',
    },
  ],
};

const mockApiBooksData: ApiBook[] = [
  mockFictionBook,
  mockNonFictionBook,
  mockTextbook,
];

const mockApiTagsData: ApiTag[] = [
  {
    id: 1,
    count: 12,
    label: 'space',
  },
  {
    id: 2,
    count: 8,
    label: 'planets',
  },
  {
    id: 3,
    count: 9,
    label: 'mars',
  },
  {
    id: 4,
    count: 4,
    label: 'engineering',
  },
  {
    id: 5,
    count: 7,
    label: 'rockets',
  },
  {
    id: 6,
    count: 7,
    label: 'pluto',
  },
];

describe('useSearch API Error', () => {
  it('renders initial state and handles API error', async () => {
    axios.get.mockRejectedValueOnce('womp');
    axios.get.mockRejectedValueOnce('womp');

    const { result, waitForNextUpdate } = renderHook(() => useSearch());

    expect(result.current.books).toEqual({ books: [], loading: true });
    expect(result.current.tags).toEqual({ tags: [], loading: true });
    expect(result.current.input.value).toEqual('');
    expect(result.current.filters.value).toEqual({
      showFiction: true,
      showNonFiction: true,
      showTextbook: true,
    });

    await waitForNextUpdate();

    expect(result.current.books).toEqual({
      books: [],
      loading: false,
    });
    expect(result.current.tags).toEqual({
      tags: [],
      loading: false,
    });
  });
});

describe('useSearch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockResolvedValueOnce({ data: mockApiBooksData });
    axios.get.mockResolvedValueOnce({ data: mockApiTagsData });
  });

  describe('Initial State Setup', () => {
    it('renders initial state and fetches data', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useSearch());

      expect(result.current.books).toEqual({ books: [], loading: true });
      expect(result.current.tags).toEqual({ tags: [], loading: true });
      expect(result.current.input.value).toEqual('');
      expect(result.current.filters.value).toEqual({
        showFiction: true,
        showNonFiction: true,
        showTextbook: true,
      });

      await waitForNextUpdate();

      expect(result.current.books).toEqual({
        books: mockApiBooksData,
        loading: false,
      });
      expect(result.current.tags).toEqual({
        tags: mockApiTagsData,
        loading: false,
      });
    });
  });

  describe('Input Functionality', () => {
    it('Correctly handles a change in search string', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useSearch());
      await waitForNextUpdate();

      act(() => {
        result.current.input.set('mars');
      });

      await waitForNextUpdate();

      expect(result.current.input.value).toEqual('mars');
      expect(result.current.books.books).toEqual([mockApiBooksData[0]]);
      expect(result.current.tags.tags).toEqual([mockApiTagsData[2]]);

      act(() => {
        result.current.input.set('');
      });

      expect(result.current.input.value).toEqual('');
      expect(result.current.books.books).toEqual(mockApiBooksData);
      expect(result.current.tags.tags).toEqual(mockApiTagsData);
    });
  });

  describe('Tag Functionality', () => {
    it('Correctly handles tag selection', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useSearch());
      await waitForNextUpdate();

      act(() => {
        result.current.selectTag('mars');
      });

      await waitForNextUpdate();

      expect(result.current.input.value).toEqual('mars');
      expect(result.current.books.books).toEqual([mockApiBooksData[0]]);
      expect(result.current.tags.tags).toEqual([
        { ...mockApiTagsData[2], selected: true },
      ]);

      act(() => {
        result.current.selectTag('');
      });

      expect(result.current.input.value).toEqual('');
      expect(result.current.books.books).toEqual(mockApiBooksData);
      expect(result.current.tags.tags).toEqual(mockApiTagsData);
    });
  });

  describe('Filter Functionality', () => {
    it('Correctly handles filter selection', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useSearch());
      await waitForNextUpdate();

      act(() => {
        result.current.filters.set(BookType.fiction);
      });

      expect(result.current.filters.value).toEqual({
        showFiction: false,
        showNonFiction: true,
        showTextbook: true,
      });
      expect(result.current.books.books).toHaveLength(2);

      act(() => {
        result.current.filters.set(BookType.nonFiction);
      });

      expect(result.current.filters.value).toEqual({
        showFiction: false,
        showNonFiction: false,
        showTextbook: true,
      });
      expect(result.current.books.books).toHaveLength(1);

      act(() => {
        result.current.filters.set(BookType.fiction);
      });

      expect(result.current.filters.value).toEqual({
        showFiction: true,
        showNonFiction: false,
        showTextbook: true,
      });
      expect(result.current.books.books).toHaveLength(2);
    });
  });
});
