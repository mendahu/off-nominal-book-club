import { shallow } from 'enzyme';
import { Button } from '@material-ui/core';
import AddPatreon from '../AddPatreon';
import axios from 'axios';
jest.mock('axios');

describe('Add Patreon', () => {
  it('should render and match snapshot', () => {
    const wrapper = shallow(<AddPatreon />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should execute skipProfile if skip button clicked', () => {
    const mockSkipProfile = jest.fn();
    axios.post.mockImplementation(() => 'post');

    const wrapper = shallow(<AddPatreon skipProfile={mockSkipProfile} />);
    wrapper.find(Button).at(3).simulate('click');
    expect(mockSkipProfile).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});
