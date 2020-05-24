import { shallow } from 'enzyme';
import LayoutComponent from '../LayoutComponent';
import { Paper } from '@material-ui/core';

describe('LayouComponent', () => {
  it('Should render without crashing', () => {
    const wrapper = shallow(<LayoutComponent />);
    expect(wrapper.find(Paper)).toHaveLength(1);
  });
});
