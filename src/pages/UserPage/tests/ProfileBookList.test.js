import { shallow } from 'enzyme';
import ProfileBookList from '../components/ProfileBookList';
import ProfileBookListItem from '../components/ProfileBookListItem';
import { Typography } from '@material-ui/core';

const testProps = [
  {
    title: 'The Best Book',
    author: 'Jake',
    id: 1,
    image_url:
      'http://books.google.com/books/content?id=MQeHAAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  },
  {
    title: 'The worst Book',
    author: 'JB',
    id: 2,
    image_url:
      'http://books.google.com/books/content?id=MQeHAAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  },
  {
    title: 'The mediumest Book',
    author: 'Anthony',
    id: 3,
    image_url:
      'http://books.google.com/books/content?id=MQeHAAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
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
