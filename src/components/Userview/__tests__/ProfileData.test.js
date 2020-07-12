import { shallow } from 'enzyme';
import ProfileData from '../ProfileData';
import { Button } from '@material-ui/core';

const testUser = {
  userId: 538,
  email: 'test@test.com',
};

describe('ProfileData', () => {
  it('Should show connect button if Patreon is not connected', () => {
    const wrapper = shallow(<ProfileData {...testUser} patreonState={false} />);
    expect(wrapper.find(Button).first().text()).toEqual('Connect');
  });

  it('Should show disconnect button if Patreon is connected', () => {
    const wrapper = shallow(<ProfileData {...testUser} patreonState={true} />);
    expect(wrapper.find(Button).first().text()).toEqual('Connect');
  });
});
