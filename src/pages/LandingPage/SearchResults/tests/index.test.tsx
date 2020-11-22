import { shallow } from 'enzyme';
import SearchResults, { SearchResultsProps } from '../';
import { useUser } from '../../../../../lib/user';
import Message from '../../../../components/Utility/Message';
import { ApiBook } from '../../../../types/api/apiTypes';
import SearchResult from '../SearchResult';
import SearchResultsSkeleton from '../skeletons/SearchResultsSkeleton';

jest.mock('../../../../../lib/user');

const mockTagClickHandler = jest.fn();

describe('SearchResults', () => {
  const defaultProps: SearchResultsProps = {
    results: [],
    loading: false,
    tagClickHandler: mockTagClickHandler,
  };

  let books: ApiBook[];

  beforeEach(() => {
    books = [
      {
        id: 5,
        title: 'a book',
        description: 'a short description of a book',
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
    jest.clearAllMocks();
    useUser.mockResolvedValueOnce({ loading: false, user: { onbc_id: 1 } });
  });

  it('should render loading state when loading', () => {
    const wrapper = shallow(<SearchResults {...defaultProps} loading={true} />);

    expect(wrapper.find(SearchResultsSkeleton)).toHaveLength(1);
    expect(wrapper.find(SearchResult)).toHaveLength(0);
    expect(wrapper.find(Message)).toHaveLength(0);
  });

  it('should render warning message when no results found', () => {
    const wrapper = shallow(<SearchResults {...defaultProps} />);

    expect(wrapper.find(SearchResultsSkeleton)).toHaveLength(0);
    expect(wrapper.find(SearchResult)).toHaveLength(0);
    expect(wrapper.find(Message)).toHaveLength(1);
  });

  it('should render book results', () => {
    const wrapper = shallow(
      <SearchResults {...defaultProps} results={books} />
    );

    expect(wrapper.find(SearchResultsSkeleton)).toHaveLength(0);
    expect(wrapper.find(SearchResult)).toHaveLength(2);
    expect(wrapper.find(Message)).toHaveLength(0);
  });
});
