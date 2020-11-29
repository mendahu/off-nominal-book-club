import { shallow } from 'enzyme';
import ProfileBookListItem from '../ProfileBookListItem';
import { Link, Typography } from '@material-ui/core';

const testBook = {
  title: 'The Best Book',
  authors: [{ name: 'Jake'}],
  id: 1,
  image_url:
    'http://books.google.com/books/content?id=MQeHAAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
};

describe('ProfileBookListItem', () => {
  it('Should render appropriate props', () => {
    const wrapper = shallow(<ProfileBookListItem book={testBook} />);
    expect(wrapper.find(Link)).toHaveLength(2);
    expect(wrapper.find(Typography)).toHaveLength(2);
  });
});
