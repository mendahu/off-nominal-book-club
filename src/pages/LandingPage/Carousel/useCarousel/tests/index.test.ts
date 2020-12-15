import { renderHook, act } from '@testing-library/react-hooks';
import { Recommend, Recommendation, useCarousel } from '../';
import axios from 'axios';
jest.mock('axios');

describe('useCarousel', () => {
  let response;
  let items: Recommendation[];

  beforeEach(() => {
    response = [
      {
        type: 'random',
        id: 8,
        title: 'Test Book 1',
        description: 'Test Book Description 1',
        google_id: '1234abcd',
        year: '2018',
        authors: [
          {
            name: 'Author 1',
          },
        ],
        userdata: {
          reads: 1,
          wishlist: 0,
          favourites: 2,
          rating: {
            avg: 4,
            count: 1,
          },
        },
        authorString: 'Author 1',
        slug: '8-author-1-test-book-1',
      },
      {
        type: 'favourite',
        id: 46,
        title: 'Test Book 2',
        description: 'Test Book Description 2',
        google_id: '1234abcd',
        year: '2014',
        authors: [
          {
            name: 'Author 2',
          },
          {
            name: 'Author 3',
          },
        ],
        favs: '2',
        userdata: {
          reads: 1,
          wishlist: 0,
          favourites: 1,
          rating: {
            avg: null,
            count: 0,
          },
        },
        authorString: 'Author 2, Author 3',
        slug: '46-author-2-author-3-test-book-2',
      },
    ];

    items = [
      {
        type: Recommend.random,
        id: 8,
        title: 'Test Book 1',
        description: 'Test Book Description 1',
        google_id: '1234abcd',
        year: '2018',
        authors: [
          {
            name: 'Author 1',
          },
        ],
        userdata: {
          reads: 1,
          wishlist: 0,
          favourites: 2,
          rating: {
            avg: 4,
            count: 1,
          },
        },
        authorString: 'Author 1',
        slug: '8-author-1-test-book-1',
        headline: 'Try a random book!',
        subline: 'Chosen from our collection',
      },
      {
        type: Recommend.favourite,
        id: 46,
        title: 'Test Book 2',
        description: 'Test Book Description 2',
        google_id: '1234abcd',
        year: '2014',
        authors: [
          {
            name: 'Author 2',
          },
          {
            name: 'Author 3',
          },
        ],
        favs: '2',
        userdata: {
          reads: 1,
          wishlist: 0,
          favourites: 1,
          rating: {
            avg: null,
            count: 0,
          },
        },
        authorString: 'Author 2, Author 3',
        slug: '46-author-2-author-3-test-book-2',
        headline: 'Community Favourite',
        subline: "The community's favourite this month",
      },
    ];

    jest.clearAllMocks();
  });

  it('should render initial state and call API to render recommends', async () => {
    axios.get.mockResolvedValueOnce({ data: response });

    const { result, waitForNextUpdate } = renderHook(() => useCarousel());

    // initial state
    expect(result.current.carouselItems).toEqual([]);
    expect(result.current.loading).toEqual(true);

    // wait for useEffect
    await waitForNextUpdate();

    expect(result.current.carouselItems).toEqual(items);
    expect(result.current.loading).toEqual(false);
  });
});
