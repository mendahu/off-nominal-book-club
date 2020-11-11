import { Chip, CircularProgress, Tooltip } from '@material-ui/core';
import { shallow } from 'enzyme';
import MetaFlags, { determineIcon, Flag, MetaFlagsProps } from '../MetaFlags';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

describe('MetaFlags', () => {
  const defaultProps: MetaFlagsProps = {
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
    bookId: 5,
  };

  it('should render 3 tooltips and 3 chips with correct props', () => {
    const wrapper = shallow(<MetaFlags {...defaultProps} />);

    const chips = wrapper.find(Chip);
    expect(wrapper.find(Tooltip)).toHaveLength(3);
    expect(chips).toHaveLength(3);

    const readChip = chips.at(0);
    const wishlistChip = chips.at(1);
    const favouritesChip = chips.at(2);

    expect(readChip.prop('label')).toEqual(5);
    expect(wishlistChip.prop('label')).toEqual(4);
    expect(favouritesChip.prop('label')).toEqual(2);
  });
});

describe('determineIcon', () => {
  it('should return loading icon', () => {
    const icon = determineIcon(Flag.reads, 5, true);
    expect(icon).toEqual(<CircularProgress size={24} color="inherit" />);
  });

  it('should return unchecked Read icon', () => {
    const icon = determineIcon(Flag.reads, undefined, false);
    expect(icon).toEqual(<CheckCircleOutlineIcon />);
  });

  it('should return checked Read icon', () => {
    const icon = determineIcon(Flag.reads, 5, false);
    expect(icon).toEqual(<CheckCircleIcon />);
  });

  it('should return unchecked Wishlist icon', () => {
    const icon = determineIcon(Flag.wishlist, undefined, false);
    expect(icon).toEqual(<BookmarkBorderIcon />);
  });

  it('should return checked Wishlist icon', () => {
    const icon = determineIcon(Flag.wishlist, 5, false);
    expect(icon).toEqual(<BookmarkIcon />);
  });

  it('should return unchecked Favourites icon', () => {
    const icon = determineIcon(Flag.favourites, undefined, false);
    expect(icon).toEqual(<FavoriteBorderIcon />);
  });

  it('should return checked Favourites icon', () => {
    const icon = determineIcon(Flag.favourites, 5, false);
    expect(icon).toEqual(<FavoriteIcon />);
  });
});
