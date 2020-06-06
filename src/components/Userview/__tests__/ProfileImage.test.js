import { shallow } from 'enzyme';
import ProfileImage from '../ProfileImage';
import { Avatar } from '@material-ui/core';

const testUser = {
  name: 'Test User',
  avatar:
    'https://s.gravatar.com/avatar/673d72d2168b174d3d15b865d064ed67?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fin.png',
};

describe('ProfileImage', () => {
  it('Should renders an Avatar', () => {
    const wrapper = shallow(
      <ProfileImage name={testUser.name} avatar={testUser.avatar} />
    );
    expect(wrapper.find(Avatar)).toHaveLength(1);
  });
});
