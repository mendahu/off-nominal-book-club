import { shallow } from 'enzyme';
import Navbar from '../Navbar';
import { Button, Box } from '@material-ui/core';
import { useUser } from '../../../lib/user';
import DrawerContents from '../Navbar/DrawerContents';
jest.mock('../../../lib/user');

describe('Navbar', () => {
  it('should render one button, Box and Drawer Contents for unauthenticated user', () => {
    useUser.mockImplementationOnce(() => {
      return { user: undefined, loading: false };
    });

    const wrapper = shallow(<Navbar />);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Box)).toHaveLength(1);
    expect(wrapper.find(DrawerContents)).toHaveLength(1);
  });

  it('should render an add Book button for Patrons', () => {
    useUser.mockImplementationOnce(() => {
      return {
        user: {
          isPatron: true,
        },
        loading: false,
      };
    });

    const wrapper = shallow(<Navbar />);
    const buttons = wrapper.find(Button);
    expect(buttons).toHaveLength(2);
    expect(buttons.at(1).text()).toEqual('Add a Book');
  });
});
