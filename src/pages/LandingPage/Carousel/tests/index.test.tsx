import { CircularProgress } from '@material-ui/core';
import { shallow } from 'enzyme';
import { MDBCarousel, MDBCarouselItem } from 'mdbreact';
import Carousel from '..';
import { Recommend, Recommendation, useCarousel } from '../useCarousel';
jest.mock('../useCarousel');

describe('Carousel', () => {
  let mockCarouselItems: Recommendation[];
  beforeEach(() => {
    mockCarouselItems = [
      {
        type: Recommend.random,
        id: 8,
        title: 'Test Book 1',
        description: 'Test Book Description 1',
        thumbnail: 'https://www.image.com/image.png',
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
        headline: 'A headline 1',
        subline: 'A subline 1',
      },
      {
        type: Recommend.favourite,
        id: 46,
        title: 'Test Book 2',
        description: 'Test Book Description 2',
        thumbnail: 'https://www.image.com/image.png',
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
        headline: 'A headline 2',
        subline: 'A subline 2',
      },
    ];
    jest.clearAllMocks();
  });

  it('should render loading progress if loading API', () => {
    useCarousel.mockReturnValueOnce({
      loading: true,
      carouselItems: [],
    });

    const wrapper = shallow(<Carousel />);

    expect(wrapper.find(CircularProgress)).toHaveLength(1);
    expect(wrapper.find(MDBCarousel)).toHaveLength(0);
  });

  it('should render carousel if not loading', () => {
    useCarousel.mockReturnValueOnce({
      loading: false,
      carouselItems: mockCarouselItems,
    });

    const wrapper = shallow(<Carousel />);

    expect(wrapper.find(CircularProgress)).toHaveLength(0);
    expect(wrapper.find(MDBCarousel)).toHaveLength(1);
    expect(wrapper.find(MDBCarouselItem)).toHaveLength(2);
  });
});
