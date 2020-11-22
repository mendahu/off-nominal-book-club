import { renderHook, act } from '@testing-library/react-hooks';
import { useSearch } from '../useSearch';
import axios from 'axios';
import { ApiBook, ApiTag } from '../../../../types/api/apiTypes';
import { useDebounce } from '../../../../hooks/useDebounce/useDebounce';
jest.mock('axios');
jest.mock('../../../../hooks/useDebounce/useDebounce');

const mockApiBooksData: ApiBook[] = [
  {
    id: 5,
    title: 'a title',
    description: 'a long description of a book',
    year: '2001',
    thumbnail: 'http://www.image.com/picture.png',
    fiction: true,
    textbook: false,
    reads: 7,
    wishlist: 5,
    favourites: 3,
    rating: 3.8,
    authors_string: 'Author 1, Author 2',
    tags: [
      {
        id: 5,
        count: 6,
        label: 'mars',
      },
    ],
  },
  {
    id: 3,
    title: 'a different book',
    description:
      'a long description of a book. it is much longer than the other one.',
    year: '2009',
    thumbnail: 'http://www.image.com/picture.png',
    fiction: false,
    textbook: false,
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
        id: 3,
        count: 4,
        label: 'pluto',
      },
    ],
  },
];

const mockApiTagsData: ApiTag[] = [
  {
    id: 1,
    count: 1,
    label: 'space',
  },
  {
    id: 2,
    count: 3,
    label: 'mars',
  },
];

useDebounce.mockImplementation((searchTerm, time) => searchTerm);

describe('useSearch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockResolvedValueOnce({ data: mockApiBooksData });
    axios.get.mockResolvedValueOnce({ data: mockApiTagsData });
  });

  it('renders initial state and fetches data', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSearch());

    expect(result.current.books).toEqual({ books: [], loading: true });
    expect(result.current.tags).toEqual({ tags: [], loading: true });
    expect(result.current.input.value).toEqual('');

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

  it('Returns correct search results based on string mars', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSearch());
    await waitForNextUpdate();

    act(() => {
      result.current.input.set('mars');
    });

    await waitForNextUpdate();

    expect(result.current.books.books).toEqual([mockApiBooksData[0]]);
    expect(result.current.tags.tags).toEqual([mockApiTagsData[1]]);
  });

  it('Returns correct search results based on string pluto', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSearch());
    await waitForNextUpdate();

    act(() => {
      result.current.input.set('pluto');
    });

    await waitForNextUpdate();

    expect(result.current.books.books).toEqual([
      mockApiBooksData[1],
      mockApiBooksData[0],
    ]);
    expect(result.current.tags.tags).toEqual([]);
  });

  it('Returns correct search results based on string book', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSearch());
    await waitForNextUpdate();

    act(() => {
      result.current.input.set('book');
    });

    await waitForNextUpdate();

    expect(result.current.books.books).toEqual([
      mockApiBooksData[1],
      mockApiBooksData[0],
    ]);
    expect(result.current.tags.tags).toEqual([]);
  });

  it('Returns correct search results based on selected tag mars', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSearch());
    await waitForNextUpdate();

    act(() => {
      result.current.selectTag('mars');
    });

    await waitForNextUpdate();

    expect(result.current.books.books).toEqual([mockApiBooksData[0]]);
    expect(result.current.tags.tags).toEqual([
      { ...mockApiTagsData[1], selected: true },
    ]);
  });
});
