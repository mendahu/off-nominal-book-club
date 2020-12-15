import { shallow } from 'enzyme';
import ProfileBookListItem from '../ProfileBookListItem';
import { Link, Typography } from '@material-ui/core';

const testBook = {
  title: 'The Best Book',
  authors: [{ name: 'Jake'}],
  id: 1,
  google_id: `1234abcde`
};

describe('ProfileBookListItem', () => {
  it('Should render appropriate props', () => {
    const wrapper = shallow(<ProfileBookListItem book={testBook} />);
    expect(wrapper.find(Link)).toHaveLength(2);
    expect(wrapper.find(Typography)).toHaveLength(2);
  });
});
