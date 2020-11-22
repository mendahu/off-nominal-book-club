import { shallow } from 'enzyme';
import SearchResults, { SearchResultsProps } from '../';

const mockTagClickHandler = jest.fn();

describe('SearchResults', () => {
  const defaultProps: SearchResultsProps = {
    results: [],
    loading: true,
    tagClickHandler: mockTagClickHandler,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = shallow(<SearchResults {...defaultProps} />);
  });
});
