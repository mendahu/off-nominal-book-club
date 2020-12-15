import { shallow } from 'enzyme';
import ProfileBookList from '../ProfileBookList';
import ProfileBookListItem from '../ProfileBookListItem/ProfileBookListItem';
import { Typography } from '@material-ui/core';

const testProps = [
  {
    title: 'The Best Book',
    author: 'Jake',
    id: 1,
    google_id: '1234abcd'
  },
  {
    title: 'The worst Book',
    author: 'JB',
    id: 2,
    google_id: '1234abcd'
  },
  {
    title: 'The mediumest Book',
    author: 'Anthony',
    id: 3,
    google_id: '1234abcd'
  },
];

describe('ProfileBookList', () => {
  it('Should render appropriate amount of books', () => {
    const wrapper = shallow(
      <ProfileBookList listTitle="Wishlist" books={testProps} />
    );
    expect(wrapper.find(ProfileBookListItem)).toHaveLength(3);
  });
  it('Should render correct Title', () => {
    const wrapper = shallow(
      <ProfileBookList listTitle="Wishlist" books={testProps} />
    );
    const title = wrapper.find(Typography);
    expect(title.text()).toMatch(/Wishlist/);
  });
});
