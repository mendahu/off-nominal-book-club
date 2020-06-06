import { shallow } from 'enzyme';
import Register from '../../../../pages/users/register';
import Registration from '../Registration';
import Message from '../../Utility/Message';
import { useFetchUser } from '../../../../lib/user';
import Router from 'next/router';

jest.mock('../../../../lib/user');
jest.mock('next/router');

describe('User Registration', () => {
  it('Should render a Message if loading', () => {
    useFetchUser.mockReturnValue({
      loading: true,
      user: undefined,
    });

    const wrapper = shallow(<Register justConnectedPatreon="false" />);
    expect(wrapper.find(Message)).toHaveLength(1);
  });

  it('Should render a Message if no longer loading but no user', () => {
    useFetchUser.mockReturnValue({
      loading: false,
      user: null,
    });
    Router.push.mockImplementationOnce(() => 'pushed router');

    Router.push.mockClear();
    const wrapper = shallow(<Register justConnectedPatreon="false" />);
    expect(Router.push.mock.calls.length).toBe(1);
    expect(wrapper.find(Message)).toHaveLength(1);
  });

  it('Should render Registration if patreon status is unchecked', () => {
    useFetchUser.mockReturnValue({
      loading: false,
      user: {
        onbc_id: 1,
        patreon: {
          state: 'unchecked',
        },
      },
    });

    const wrapper = shallow(<Register justConnectedPatreon="false" />);
    expect(wrapper.find(Registration)).toHaveLength(1);
  });

  it('Should render Registration if patreon was just connected', () => {
    useFetchUser.mockReturnValue({
      loading: false,
      user: {
        onbc_id: 1,
        patreon: {
          state: 'connected',
        },
      },
    });

    const wrapper = shallow(<Register justConnectedPatreon="true" />);
    expect(wrapper.find(Registration)).toHaveLength(1);
  });
});
