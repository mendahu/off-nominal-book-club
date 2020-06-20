import { shallow } from 'enzyme';
import ProfileData from '../ProfileData';

const testUser = {
  name: 'jake',
  bio: 'biography',
};

describe('ProfileData', () => {
  it('Should render no edit button when not logged in', () => {
    const wrapper = shallow(<ProfileData {...testUser} loggedIn={false} />);
    expect(wrapper.find(Link)).toHaveLength(0);
  });
});
