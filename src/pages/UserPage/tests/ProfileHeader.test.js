import { shallow } from 'enzyme';
import ProfileHeader from '../components/ProfileHeader';
import { Link, Button } from '@material-ui/core';

const testUser = {
  name: 'jake',
  bio: 'biography',
};

describe('ProfileImage', () => {
  it('Should render no edit button when not logged in', () => {
    const wrapper = shallow(
      <ProfileHeader {...testUser} isUserAuthorized={false} />
    );
    expect(wrapper.find(Link)).toHaveLength(0);
  });

  it('Should render edit button when not logged in', () => {
    const wrapper = shallow(
      <ProfileHeader {...testUser} isUserAuthorized={true} />
    );
    expect(wrapper.find(Link)).toHaveLength(1);
  });

  it('Should render button when edit clicked', () => {
    const wrapper = shallow(
      <ProfileHeader {...testUser} isUserAuthorized={true} />
    );

    const editButton = wrapper.find(Link);
    editButton.simulate('click');

    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('Should render no more button when button clicked', () => {
    const wrapper = shallow(
      <ProfileHeader {...testUser} isUserAuthorized={true} />
    );

    const editButton = wrapper.find(Link);
    editButton.simulate('click');

    const button = wrapper.find(Button);
    button.simulate('click');

    expect(wrapper.find(Button)).toHaveLength(0);
  });
});
