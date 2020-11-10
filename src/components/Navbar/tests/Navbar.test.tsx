import { shallow } from 'enzyme';
import Navbar from '../Navbar';
import { Button, Box } from '@material-ui/core';
import { useUser } from '../../../../lib/user';
import DrawerContents from '../Drawer/DrawerContents';
jest.mock('../../../../lib/user');

useUser.mockImplementation(() => ({ user: undefined, loading: false }));

describe('Navbar', () => {
  beforeEach(() => {
    useUser.mockClear();
  });

  it('should render one button, Box and Drawer Contents for unauthenticated user', () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Box)).toHaveLength(1);
    expect(wrapper.find(DrawerContents)).toHaveLength(1);
  });

  it('should render an add Book button for Patrons', () => {
    useUser.mockImplementationOnce(() => ({
      user: {
        isPatron: true,
      },
      loading: false,
    }));

    const wrapper = shallow(<Navbar />);
    const buttons = wrapper.find(Button);
    expect(buttons).toHaveLength(2);
    expect(buttons.at(1).text()).toEqual('Add a Book');
  });
});
