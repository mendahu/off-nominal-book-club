import { shallow } from 'enzyme';
import DrawerItem from '../DrawerItem';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';

describe('Drawer Item', () => {
  it('should render with the right icon', () => {
    const wrapper = shallow(
      <DrawerItem text="test text" icon={<AirplanemodeActiveIcon />} />
    );

    expect(wrapper.find(AirplanemodeActiveIcon)).toHaveLength(1);
  });
});
