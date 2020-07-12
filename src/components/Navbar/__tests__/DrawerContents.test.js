import { shallow } from 'enzyme';
import DrawerContents from '../DrawerContents';
import DrawerItem from '../DrawerItem';
import { Avatar, Typography } from '@material-ui/core';

const testToggle = jest.fn();

const defaultProps = {
  toggleDrawer: testToggle,
};

const defaultUser = {
  onbc_id: 1,
  avatar: 'www.avatar.com',
  name: 'Jake',
  reads: [],
  favourites: [],
  wishlist: [],
};

describe('Drawer Contents', () => {
  beforeEach(() => {
    testToggle.mockClear();
  });

  it('should render an about page link and a log out link for unauthenticated users', () => {
    const wrapper = shallow(<DrawerContents {...defaultProps} />);
    expect(wrapper.find(DrawerItem)).toHaveLength(2);
  });

  it('should not render an avatar for unauthenticated users', () => {
    const wrapper = shallow(<DrawerContents {...defaultProps} />);
    expect(wrapper.find(Avatar)).toHaveLength(0);
  });

  it('should not render user text for unauthenticated users', () => {
    const wrapper = shallow(<DrawerContents {...defaultProps} />);
    expect(wrapper.find(Typography)).toHaveLength(0);
  });

  it('should render a profile image for an authenticated user', () => {
    const wrapper = shallow(
      <DrawerContents {...defaultProps} user={defaultUser} />
    );
    expect(wrapper.find(Avatar)).toHaveLength(1);
  });

  it('should render user text for authenticated users', () => {
    const wrapper = shallow(
      <DrawerContents {...defaultProps} user={defaultUser} />
    );
    const text = wrapper.find(Typography);
    expect(text).toHaveLength(4);
    expect(text.at(0).text()).toEqual('Jake');
    expect(text.at(1).text()).toEqual('READS: 0');
    expect(text.at(2).text()).toEqual('FAVOURITES: 0');
    expect(text.at(3).text()).toEqual('WISHLIST: 0');
  });

  it('should render an add book icon for patrons', () => {
    const wrapper = shallow(
      <DrawerContents
        {...defaultProps}
        user={{ ...defaultUser, isPatron: true }}
      />
    );
    expect(wrapper.find(DrawerItem)).toHaveLength(3);
  });
});
