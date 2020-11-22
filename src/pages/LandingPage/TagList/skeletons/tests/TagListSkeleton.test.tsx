import { Skeleton } from '@material-ui/lab';
import { shallow } from 'enzyme';
import TagListSkeleton from '../TagListSkeleton';

describe('SearchResultsSkeleton', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<TagListSkeleton />);
    expect(wrapper.find(Skeleton)).toHaveLength(5);
  });
});
