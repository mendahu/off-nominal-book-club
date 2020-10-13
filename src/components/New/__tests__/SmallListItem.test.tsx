import { Button } from '@material-ui/core';
import { shallow } from 'enzyme';
import SmallListItem from '../SmallListItem';

describe('SearchResult should render without crashing', () => {
  const mockData = {
    imageUrl: 'image.png',
    title: 'A title',
    authorString: 'Jake Robins',
  };

  const mockButton = {
    id: 1,
  };

  it('Should render no button if not passed in', () => {
    const testData = { ...mockData };
    const wrapper = shallow(<SmallListItem {...testData} />);
    expect(wrapper.find(Button)).toHaveLength(0);
  });

  it('Should render a button if passed in', () => {
    const testData = { ...mockData, button: mockButton };
    const wrapper = shallow(<SmallListItem {...testData} />);
    expect(wrapper.find(Button)).toHaveLength(1);
  });
});
