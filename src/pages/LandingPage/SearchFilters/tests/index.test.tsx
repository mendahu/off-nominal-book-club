import { Chip } from '@material-ui/core';
import { shallow } from 'enzyme';
import { BookType } from '../../../../types/common.d';
import SearchFilters, { SearchFiltersProps } from '../index';

const mockSetFilter = jest.fn();

const defaultProps: SearchFiltersProps = {
  filters: {
    showFiction: true,
    showNonFiction: true,
    showTextbook: false,
  },
  setFilter: mockSetFilter,
};

describe('SearchFilters', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<SearchFilters {...defaultProps} />);

    const chips = wrapper.find(Chip);
    expect(chips).toHaveLength(3);
    expect(chips.at(0).props().color).toEqual('primary');
    expect(chips.at(1).props().color).toEqual('primary');
    expect(chips.at(2).props().color).toEqual('default');
  });

  it('should call setFilter when clicked', () => {
    const wrapper = shallow(<SearchFilters {...defaultProps} />);

    const chips = wrapper.find(Chip);

    chips.at(0).simulate('click');
    expect(mockSetFilter).toHaveBeenCalledWith(BookType.fiction);
    mockSetFilter.mockClear();

    chips.at(1).simulate('click');
    expect(mockSetFilter).toHaveBeenCalledWith(BookType.nonFiction);
    mockSetFilter.mockClear();

    chips.at(2).simulate('click');
    expect(mockSetFilter).toHaveBeenCalledWith(BookType.textbook);
    mockSetFilter.mockClear();
  });
});
