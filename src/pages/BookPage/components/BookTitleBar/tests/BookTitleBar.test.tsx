import { shallow } from 'enzyme';
import BookTitleBar from '../BookTitleBar';

describe('BookDescription', () => {
  it('Should render without crashing', () => {
    const wrapper = shallow(<BookTitleBar authors={['Jake', 'Anthony']} />);
  });
});
