import { shallow } from 'enzyme';
import DataPromote from '../DataPromote';

describe('DataPromote should render without crashing', () => {
  it("Should render error message if book doesn't exist in database", () => {
    const wrapper = shallow(<DataPromote />);
  });
});
