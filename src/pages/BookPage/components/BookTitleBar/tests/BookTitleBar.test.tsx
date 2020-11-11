import { Typography } from '@material-ui/core';
import { Star } from '@material-ui/icons';
import { shallow } from 'enzyme';
import MetaFlags from '../../../../../components/MetaFlags/MetaFlags';
import BookTitleBar, { BookTitleBarProps } from '../BookTitleBar';

describe('BooktitleBar', () => {
  const defaultProps: BookTitleBarProps = {
    bookId: 5,
    metaData: {
      reads: {
        count: 5,
        id: 1,
        loading: false,
      },
      wishlist: {
        count: 4,
        loading: false,
      },
      favourites: {
        count: 2,
        id: 4,
        loading: false,
      },
    },
    authorString: 'some authors',
    thumbnail: '/image.png',
    ratingString: '3.5 (2 ratings)',
    title: 'a book title',
    year: '1995',
  };

  it('Should render stuff without crashing', () => {
    const wrapper = shallow(<BookTitleBar {...defaultProps} />);
    expect(wrapper.find(Star)).toHaveLength(1);
    expect(wrapper.find(MetaFlags)).toHaveLength(1);

    const textFields = wrapper.find(Typography);
    expect(textFields).toHaveLength(3);

    expect(textFields.at(0).text()).toEqual(defaultProps.ratingString);
    expect(textFields.at(1).text()).toEqual(defaultProps.title);
    expect(textFields.at(2).text()).toEqual(
      `${defaultProps.authorString} - ${defaultProps.year}`
    );
  });
});
