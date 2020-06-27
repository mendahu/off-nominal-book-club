import { shallow } from 'enzyme';
import ProfileData from '../ProfileData';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { OnbcSnackbar } from '../../../hooks/useSnackbar';
jest.mock('axios');

const testUser = {
  userId: 538,
  email: 'test@test.com',
};

describe('ProfileData', () => {
  it('Should connect button if Patreon is not connected', () => {
    const wrapper = shallow(<ProfileData {...testUser} patreonState={false} />);
    expect(wrapper.find(Button).first().text()).toEqual('Connect');
  });

  it('Should disconnect button if Patreon is connected', () => {
    const wrapper = shallow(<ProfileData {...testUser} patreonState={true} />);
    expect(wrapper.find(Button).first().text()).toEqual('Connect');
  });
});
