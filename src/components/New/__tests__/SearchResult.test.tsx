import { shallow } from 'enzyme';
import SearchResult from '../SearchResult';

const mockClicker = jest.fn();

describe('SearchResult should render without crashing', () => {
  const testData = {
    cover: '/image.png',
    title: 'A title',
    authors: 'Jake Robins',
    year: '1985',
    description: 'A wonderful book',
    clickHandler: mockClicker,
  };

  it('Should render without crashing', () => {
    const wrapper = shallow(<SearchResult {...testData} />);
  });
});
