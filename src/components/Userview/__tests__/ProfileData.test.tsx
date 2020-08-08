import { shallow } from 'enzyme';
import ProfileData, { ProfileDataProps } from '../ProfileData';
import { Button, Checkbox } from '@material-ui/core';
import axios from 'axios';
jest.mock('axios');

const mockTriggerSnackbar = jest.fn();

const testUser: ProfileDataProps = {
  patreonState: 'connected',
  email: 'test@test.com',
  getsMail: true,
  triggerSnackbar: mockTriggerSnackbar,
};

describe('ProfileData', () => {
  beforeEach(() => {
    mockTriggerSnackbar.mockClear();
  });

  it('Should show connect button if Patreon is not connected', () => {
    const wrapper = shallow(
      <ProfileData {...testUser} patreonState="skipped" />
    );
    expect(wrapper.find(Button).first().text()).toEqual('Connect');
  });

  it('Should show disconnect button if Patreon is connected', () => {
    const wrapper = shallow(
      <ProfileData {...testUser} patreonState="connected" />
    );
    expect(wrapper.find(Button).first().text()).toEqual('Connect');
  });

  it('should trigger successful snackbar when Patreon disconnect is clicked and API succeeds', () => {
    const wrapper = shallow(
      <ProfileData {...testUser} patreonState="connected" />
    );
    axios.get.mockResolvedValueOnce();
    wrapper.find(Button).first().simulate('click');
    expect(mockTriggerSnackbar).toHaveBeenCalledTimes(1);
    expect(mockTriggerSnackbar).toHaveBeenCalledWith({
      active: true,
      message: 'Patreon Account Disconnected!',
      severity: 'success',
    });
  });

  it('should trigger unsuccessful snackbar when Patreon disconnect is clicked and API fails', () => {
    const wrapper = shallow(
      <ProfileData {...testUser} patreonState="connected" />
    );
    axios.get.mockRejectedValueOnce();
    wrapper.find(Button).first().simulate('click');
    expect(mockTriggerSnackbar).toHaveBeenCalledTimes(1);
    expect(mockTriggerSnackbar).toHaveBeenCalledWith({
      active: true,
      message: 'Something went wrong!',
      severity: 'error',
    });
  });

  it('Should not have checkbox checked if getsMail is false', () => {
    const wrapper = shallow(
      <ProfileData {...testUser} getsMail={false} patreonState="connected" />
    );
    expect(wrapper.find(Checkbox).props().checked).toBe(false);
  });

  it('Should have checkbox checked if getsMail is true', () => {
    const wrapper = shallow(
      <ProfileData {...testUser} patreonState="connected" />
    );
    expect(wrapper.find(Checkbox).props().checked).toBe(true);
  });
});
