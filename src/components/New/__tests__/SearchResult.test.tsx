import { Button, Collapse, IconButton } from '@material-ui/core';
import { shallow } from 'enzyme';
import SearchResult from '../SearchResult';

const mockClicker = jest.fn();

describe('SearchResult should render without crashing', () => {
  const testData = {
    cover: '/image.png',
    title: 'A title',
    authors: 'Jake Robins',
    year: '1985',
    description:
      "Steve Squyres is the face and voice of NASA's Mars Exploration Rover mission. Squyres dreamed up the mission in 1987, saw it through from conception in 1995 to a successful landing in 2004, and serves as the principal scientist of its $400 million payload. He has gained a rare inside look at what it took for rovers Spirit and Opportunity to land on the red planet in January 2004--and knows firsthand their findings.",
    clickHandler: mockClicker,
  };

  beforeEach(() => {
    mockClicker.mockClear();
  });

  it('should call the click handler when the button is clicked', () => {
    const wrapper = shallow(<SearchResult {...testData} />);
    wrapper.find(Button).simulate('click');
    expect(mockClicker).toHaveBeenCalledTimes(1);
  });

  it('should adjust description if expander is clicked', () => {
    const wrapper = shallow(<SearchResult {...testData} />);
    expect(wrapper.find(Collapse).at(0).props().in).toEqual(true);
    wrapper.find(IconButton).simulate('click');
    expect(wrapper.find(Collapse).at(0).props().in).toEqual(false);
  });
});
