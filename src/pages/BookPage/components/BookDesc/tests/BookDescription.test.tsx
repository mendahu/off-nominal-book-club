import { shallow } from 'enzyme';
import BookDesc from '../BookDesc';

describe('BookDescription should render without crashing', () => {
  it("Should render error message if book doesn't exist in database", () => {
    const wrapper = shallow(<BookDesc />);
  });
});
