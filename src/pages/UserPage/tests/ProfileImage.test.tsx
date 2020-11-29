import { shallow } from 'enzyme';
import ProfileImage from '../components/ProfileImage';
import { Avatar, FormControl, RadioGroup } from '@material-ui/core';
import * as SnackbarContext from '../../../contexts/SnackbarContext';
import { AvatarSelect } from '../../../types/enums';
import { useUser } from '../../../../lib/user';
jest.mock('../../../../lib/user');

const mockTriggerSnackbar = jest.fn();
jest
  .spyOn(SnackbarContext, 'useSnackbarContext')
  .mockImplementation(() => mockTriggerSnackbar);

const testUser = {
  name: 'Test User',
  avatar_select: AvatarSelect.Gravatar,
  gravatar_avatar_url:
    'https://s.gravatar.com/avatar/673d72d2168b174d3d15b865d064ed67?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fin.png',
  patreon_avatar_url:
    'https://c10.patreonusercontent.com/3/eyJ3IjoyMDB9/patreon-media/p/user/3618298/3eec71e38b3f4524ac40e84ee6b44638/1.png?token-time=2145916800&token-hash=1QLVi0kpMgttM3cyT9r6eNFQXTYgj8IWjmrbZGuUZzY%3D',
};

const tick = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
};

const getUser = (isAuthenticated: boolean, isPatron: boolean = false) => {
  const userObj = { isPatron };

  return {
    user: isAuthenticated ? userObj : null,
    loading: false,
  };
};

describe('ProfileImage', () => {
  beforeEach(() => {
    mockTriggerSnackbar.mockClear();
  });

  it('Should render an Avatar for unauthenticated user', () => {
    useUser.mockReturnValueOnce(getUser(false));
    const wrapper = shallow(
      <ProfileImage {...testUser} isUserAuthorized={false} />
    );
    expect(wrapper.find(Avatar)).toHaveLength(1);
    expect(wrapper.find(FormControl)).toHaveLength(0);
  });

  it('Should render an Avatar for authenticated Users who have not connect a Patreon account', () => {
    useUser.mockReturnValueOnce(getUser(true, false));
    const wrapper = shallow(
      <ProfileImage {...testUser} isUserAuthorized={true} />
    );
    expect(wrapper.find(Avatar)).toHaveLength(1);
    expect(wrapper.find(FormControl)).toHaveLength(0);
  });

  it('Should render an Avatar and a Form Control for authenticated Users with Patreon', () => {
    useUser.mockReturnValueOnce(getUser(true, true));
    const wrapper = shallow(
      <ProfileImage {...testUser} isUserAuthorized={true} />
    );
    expect(wrapper.find(Avatar)).toHaveLength(1);
    expect(wrapper.find(FormControl)).toHaveLength(1);
  });

  it('should trigger a snackbar when the avatar is toggled', async () => {
    useUser.mockReturnValueOnce(getUser(true, true));
    const wrapper = shallow(
      <ProfileImage {...testUser} isUserAuthorized={true} />
    );

    wrapper
      .find(RadioGroup)
      .simulate('change', { target: { value: 'patreon' } });
    await tick();

    expect(mockTriggerSnackbar).toHaveBeenCalledTimes(1);
  });
});
