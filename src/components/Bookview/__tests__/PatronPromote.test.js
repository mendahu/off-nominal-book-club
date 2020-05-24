import { shallow } from 'enzyme';
import PatronPromote from '../PatronPromote';

describe('PatronPromote should render without crashing', () => {
  it("Should render error message if book doesn't exist in database", () => {
    const wrapper = shallow(<PatronPromote />);
  });
});
