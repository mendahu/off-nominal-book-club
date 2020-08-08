import { shallow } from 'enzyme';
import ProfileData, { ProfileDataProps } from '../ProfileData';
import { Button, Checkbox } from '@material-ui/core';
import axios, { AxiosResponse } from 'axios';
import sendPasswordReset from '../../../helpers/sendPasswordReset';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('../../../helpers/sendPasswordReset');

const mockedTriggerSnackbar = jest.fn();

const testUser: ProfileDataProps = {
  patreonState: 'connected',
  email: 'test@test.com',
  getsMail: true,
  triggerSnackbar: mockedTriggerSnackbar,
};

const tick = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
};

describe('ProfileData', () => {
  beforeEach(() => {
    mockedTriggerSnackbar.mockClear();
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
    expect(wrapper.find(Button).first().text()).toEqual('Disconnect');
  });

  it('should trigger successful snackbar when Patreon disconnect is clicked and API succeeds', async () => {
    mockedAxios.post.mockClear();

    const wrapper = shallow(
      <ProfileData {...testUser} patreonState="connected" />
    );

    mockedAxios.post.mockResolvedValueOnce({});
    wrapper.find(Button).first().simulate('click');
    await tick();

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedTriggerSnackbar).toHaveBeenCalledTimes(1);
    expect(mockedTriggerSnackbar).toHaveBeenCalledWith({
      active: true,
      message: 'Patreon Account Disconnected!',
      severity: 'success',
    });
  });

  it('should trigger unsuccessful snackbar when Patreon disconnect is clicked and API fails', async () => {
    mockedAxios.post.mockClear();

    const wrapper = shallow(
      <ProfileData {...testUser} patreonState="connected" />
    );

    mockedAxios.post.mockRejectedValueOnce({});
    wrapper.find(Button).first().simulate('click');
    await tick();

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedTriggerSnackbar).toHaveBeenCalledTimes(1);
    expect(mockedTriggerSnackbar).toHaveBeenCalledWith({
      active: true,
      message: 'Something went wrong!',
      severity: 'error',
    });
  });

  it('should trigger successful snackbar when password reset button is clicked and API succeeds', async () => {
    const wrapper = shallow(
      <ProfileData {...testUser} patreonState="connected" />
    );

    const mockResponse: AxiosResponse = {
      data: {},
      status: 200,
      statusText: 'success',
      headers: {},
      config: {},
    };

    sendPasswordReset.mockResolvedValueOnce();
    wrapper.find(Button).at(1).simulate('click');
    await tick();

    expect(mockedTriggerSnackbar).toHaveBeenCalledTimes(1);
    expect(mockedTriggerSnackbar).toHaveBeenCalledWith({
      active: true,
      message: 'Password Reset Email Sent!',
      severity: 'success',
    });
  });

  it('should trigger unsuccessful snackbar when password reset button is clicked and API fails', async () => {
    const wrapper = shallow(
      <ProfileData {...testUser} patreonState="connected" />
    );

    const mockResponse: AxiosResponse = {
      data: {},
      status: 500,
      statusText: 'error',
      headers: {},
      config: {},
    };

    sendPasswordReset.mockRejectedValueOnce();
    wrapper.find(Button).at(1).simulate('click');
    await tick();

    expect(mockedTriggerSnackbar).toHaveBeenCalledTimes(1);
    expect(mockedTriggerSnackbar).toHaveBeenCalledWith({
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

  it('should trigger success snackbaron email preference update', async () => {
    const wrapper = shallow(
      <ProfileData {...testUser} patreonState="connected" />
    );

    wrapper.find(Checkbox).simulate('change');
    await tick();

    expect(mockedTriggerSnackbar).toHaveBeenCalledTimes(1);
  });
});
