import { shallow } from 'enzyme';
import Userview from '../../../../pages/users/[id]';
import {
  ProfileImage,
  ProfileHeader,
  ProfileData,
  ProfileWishList,
  ProfileReadList,
} from '../';

const testUser = {
  userId: 538,
};

describe('Userview', () => {
  it('Should render Image, Header, Wishlist and Readlist when not logged in', () => {
    const wrapper = shallow(<Userview userId={testUser.userId} />);
    console.log(wrapper.debug());
  });
});
