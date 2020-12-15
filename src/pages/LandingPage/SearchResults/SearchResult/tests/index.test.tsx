import { Chip, Typography } from '@material-ui/core';
import { shallow } from 'enzyme';
import Link from 'next/link';
import SearchResult, { SearchResultProps } from '../';
import { BookStats } from '../../../../../components/BookStats/BookStats';
import { MetaFlagData } from '../../../../../components/BookStats/MetaFlags/MetaFlags';
import { BookType } from '../../../../../types/common.d';

describe('SearchResul', () => {
  const defaultProps: SearchResultProps = {
    id: 1,
    title: 'A Book Title',
    description:
      'A Book Description. It is a long description so as to be able to test the truncation feature of the component. Which is pretty rad.',
    authorString: 'Author 1, Author 2',
    googleId: `1234abcd`,
    type: BookType.fiction,
    year: '1995',
    tags: [
      {
        id: 1,
        label: 'Tag 1',
        count: 2,
      },
      {
        id: 2,
        label: 'Tag 2',
        count: 4,
      },
    ],
    rating: 3.4,
    metaData: {
      reads: 1,
      wishlist: 2,
      favourites: 1,
    },
    userMetaData: {
      reads: 5,
      wishlist: null,
      favourites: 1,
    },
    selectTag: () => {},
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<SearchResult {...defaultProps} />);

    const links = wrapper.find(Link);
    expect(links.at(0).props().href).toEqual('/books/1');
    expect(links.at(0).props().as).toEqual(
      '/books/1-author-1-author-2-a-book-title'
    );

    const typographies = wrapper.find(Typography);
    expect(typographies.at(0).text()).toEqual(defaultProps.title);
    expect(typographies.at(1).text()).toEqual(
      `${defaultProps.authorString} - ${defaultProps.year}`
    );
    expect(typographies.at(2).text()).toEqual(
      'A Book Description. It is a long description so as to be able to test the truncation feature of the ...'
    );

    const tags = wrapper.find(Chip);
    expect(tags).toHaveLength(3);
    expect(tags.at(0).props().label).toEqual(defaultProps.type);

    const expectedMetaData: MetaFlagData = {
      reads: {
        id: 5,
        count: 1,
        loading: false,
      },
      wishlist: {
        id: null,
        count: 2,
        loading: false,
      },
      favourites: {
        id: 1,
        count: 1,
        loading: false,
      },
    };

    expect(wrapper.find(BookStats).props().metaData).toEqual(expectedMetaData);
    expect(wrapper.find(BookStats).props().ratingString).toEqual('3.4');
  });

  it('should render - for rating if it is null', () => {
    const wrapper = shallow(<SearchResult {...defaultProps} rating={null} />);
    expect(wrapper.find(BookStats).props().ratingString).toEqual('-');
  });
});
