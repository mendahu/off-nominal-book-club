import { shallow } from 'enzyme';
import ProfileImage from '../ProfileImage';
import { Avatar, Button } from '@material-ui/core';

const testUser = {
  name: 'Test User',
  avatar:
    'https://s.gravatar.com/avatar/673d72d2168b174d3d15b865d064ed67?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fin.png',
};

describe('ProfileImage', () => {
  it('Should renders an Avatar for unauthenticated user', () => {
    const wrapper = shallow(
      <ProfileImage
        name={testUser.name}
        avatar={testUser.avatar}
        newAvatarSelect="gravatar"
        loggedIn={false}
        onClick={jest.fn()}
      />
    );
    expect(wrapper.find(Avatar)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(0);
  });
  it('Should renders an Avatar and a button for authenticated users', () => {
    const wrapper = shallow(
      <ProfileImage
        name={testUser.name}
        avatar={testUser.avatar}
        newAvatarSelect="gravatar"
        loggedIn={true}
        onClick={jest.fn()}
      />
    );
    expect(wrapper.find(Avatar)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).text()).toMatch(/gravatar/);
  });
});
