import { Typography } from '@material-ui/core';
import { Star } from '@material-ui/icons';
import { shallow } from 'enzyme';
import { BookStats, BookStatsProps } from '../BookStats';
import MetaFlags from '../MetaFlags/MetaFlags';

describe('BookStats', () => {
  const defaultProps: BookStatsProps = {
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
    ratingString: '3.5 (2 ratings)',
    bookId: 5,
  };

  it('should render without error', () => {
    const wrapper = shallow(<BookStats {...defaultProps} />);

    expect(wrapper.find(Typography)).toHaveLength(1);
    expect(wrapper.find(MetaFlags)).toHaveLength(1);
    expect(wrapper.find(Star)).toHaveLength(1);
  });
});
