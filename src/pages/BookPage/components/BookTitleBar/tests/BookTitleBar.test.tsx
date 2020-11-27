import { Chip, Typography } from '@material-ui/core';
import { shallow } from 'enzyme';
import { BookStats } from '../../../../../components/BookStats/BookStats';
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
    isFiction: true,
    isTextbook: false,
  };

  it('Should render stuff without crashing', () => {
    const wrapper = shallow(<BookTitleBar {...defaultProps} />);

    expect(wrapper.find(BookStats)).toHaveLength(1);

    const textFields = wrapper.find(Typography);
    expect(textFields).toHaveLength(2);

    expect(textFields.at(0).text()).toEqual(defaultProps.title);
    expect(textFields.at(1).text()).toEqual(
      `${defaultProps.authorString} - ${defaultProps.year}`
    );
  });

  it('Should fiction but not textbook', () => {
    const wrapper = shallow(<BookTitleBar {...defaultProps} />);

    const chips = wrapper.find(Chip);
    expect(chips).toHaveLength(1);
    expect(chips.at(0).props().label).toEqual('Fiction');
  });

  it('Should non-fiction and textbook', () => {
    const wrapper = shallow(
      <BookTitleBar {...defaultProps} isFiction={false} isTextbook={true} />
    );

    const chips = wrapper.find(Chip);
    expect(chips).toHaveLength(2);
    expect(chips.at(0).props().label).toEqual('Non-fiction');
    expect(chips.at(1).props().label).toEqual('Textbook');
  });
});
