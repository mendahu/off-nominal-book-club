import { shallow } from 'enzyme';
import LandingPage from '../../../../pages/';
import SearchBar from '../../../components/SearchBar';
import { OnbcSnackbar } from '../../../hooks/useSnackbar/useSnackbar';
import { Carousel, SearchFilters, TagList, SearchResults } from '../index';

describe('LandingPage', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<LandingPage />);
    expect(wrapper.find(Carousel)).toHaveLength(1);
    expect(wrapper.find(SearchBar)).toHaveLength(1);
    expect(wrapper.find(SearchFilters)).toHaveLength(1);
    expect(wrapper.find(TagList)).toHaveLength(1);
    expect(wrapper.find(SearchResults)).toHaveLength(1);
    expect(wrapper.find(OnbcSnackbar)).toHaveLength(1);
  });
});
