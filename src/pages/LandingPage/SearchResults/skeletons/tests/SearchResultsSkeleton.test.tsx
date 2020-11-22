import { Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { shallow } from 'enzyme';
import SearchResultsSkeleton from '../SearchResultsSkeleton';

describe('SearchResultsSkeleton', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<SearchResultsSkeleton />);
    expect(wrapper.find(Paper)).toHaveLength(3);
    expect(wrapper.find(Skeleton)).toHaveLength(33);
  });
});
