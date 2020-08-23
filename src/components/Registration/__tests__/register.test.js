import { shallow } from 'enzyme';
import Register, { getServerSideProps } from '../../../../pages/users/register';
import Message from '../../Utility/Message';
import { useFetchUser } from '../../../../lib/user';
import Router from 'next/router';
import AddPatreon from '../AddPatreon';
import getAuth0USerSub from '../../../helpers/auth0/auth0Sub';
import patreonTokenFetcher from '../../../helpers/patreon/tokenFetcher';

jest.mock('../../../../lib/user');
jest.mock('next/router');
jest.mock('../../../helpers/auth0/auth0Sub');
jest.mock('../../../helpers/patreon/tokenFetcher');

Router.push.mockImplementation(() => 'pushed router');

describe('User Registration', () => {
  beforeEach(() => {
    Router.push.mockClear();
  });

  it('Should render a Message if loading', () => {
    useFetchUser.mockReturnValue({
      loading: true,
      user: undefined,
    });

    const wrapper = shallow(<Register justConnectedPatreon={false} />);
    const messageComponent = wrapper.find(Message);
    expect(messageComponent).toHaveLength(1);
    expect(messageComponent.props().message).toEqual('Validating Credentials');
  });

  it('Should render a Message if no longer loading but no user, and should redirect user to /', () => {
    useFetchUser.mockReturnValue({
      loading: false,
      user: null,
    });

    const wrapper = shallow(<Register justConnectedPatreon={false} />);
    expect(Router.push.mock.calls.length).toBe(1);
    expect(Router.push.mock.calls[0][0]).toBe('/');

    const messageComponent = wrapper.find(Message);
    expect(messageComponent).toHaveLength(1);
    expect(messageComponent.props().message).toEqual('Redirecting');
  });

  it('Should render AddPatreon if patreon status is unchecked', () => {
    useFetchUser.mockReturnValue({
      loading: false,
      user: {
        onbc_id: 1,
        patreon: {
          state: 'unchecked',
        },
      },
    });

    const wrapper = shallow(<Register justConnectedPatreon={false} />);
    expect(wrapper.find(AddPatreon)).toHaveLength(1);
  });

  it('Should redirect to users page if patreon was just connected', () => {
    useFetchUser.mockReturnValue({
      loading: false,
      user: {
        onbc_id: 1,
        patreon: {
          state: 'connected',
        },
      },
    });

    const wrapper = shallow(<Register justConnectedPatreon={true} />);
    expect(Router.push.mock.calls.length).toBe(1);
    expect(Router.push.mock.calls[0][0]).toBe('/users/1');

    const messageComponent = wrapper.find(Message);
    expect(messageComponent).toHaveLength(1);
    expect(messageComponent.props().message).toEqual('Redirecting');
  });

  it('Should redirect to / page if authed user is just logging in', () => {
    useFetchUser.mockReturnValue({
      loading: false,
      user: {
        onbc_id: 1,
        patreon: {
          state: 'connected',
        },
      },
    });

    const wrapper = shallow(<Register justConnectedPatreon={false} />);
    expect(Router.push.mock.calls.length).toBe(1);
    expect(Router.push.mock.calls[0][0]).toBe('/');

    const messageComponent = wrapper.find(Message);
    expect(messageComponent).toHaveLength(1);
    expect(messageComponent.props().message).toEqual('Redirecting');
  });
});

describe('Registartion server side props', () => {
  it('should return justConnectedPatreon false if no code', async () => {
    const mockContext = {
      query: {},
    };

    const props = await getServerSideProps(mockContext);
    expect(props).toEqual({ props: { justConnectedPatreon: false } });
  });

  it('should return justConnectedPatreon false if patreon token is a string and there is a code', async () => {
    const mockContext = {
      query: {
        code: '123',
      },
      req: {},
    };

    getAuth0USerSub.mockReturnValueOnce('123');
    patreonTokenFetcher.mockReturnValueOnce('123');

    const props = await getServerSideProps(mockContext);
    expect(props).toEqual({ props: { justConnectedPatreon: false } });
  });

  it('should return justConnectedPatreon true if patreon token is valid and there is a code', async () => {
    const mockContext = {
      query: {
        code: '123',
      },
      req: {},
    };

    getAuth0USerSub.mockReturnValueOnce('123');
    patreonTokenFetcher.mockReturnValueOnce({ token: '123' });

    const props = await getServerSideProps(mockContext);
    expect(props).toEqual({ props: { justConnectedPatreon: true } });
  });
});
