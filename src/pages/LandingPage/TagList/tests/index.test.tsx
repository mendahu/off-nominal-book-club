import { Chip } from '@material-ui/core';
import { shallow } from 'enzyme';
import TagList, { TagListProps } from '../';
import TagListSkeleton from '../skeletons/TagListSkeleton';

const mockClickHandler = jest.fn();

describe('TagList', () => {
  const defaultProps: TagListProps = {
    loading: false,
    clickHandler: mockClickHandler,
    tags: [
      {
        id: 1,
        label: 'space',
        count: 5,
      },
      {
        id: 2,
        label: 'mars',
        count: 3,
      },
    ],
  };

  it('should render skeleton if loading', () => {
    const wrapper = shallow(<TagList {...defaultProps} loading={true} />);

    expect(wrapper.find(TagListSkeleton)).toHaveLength(1);
    expect(wrapper.find(Chip)).toHaveLength(0);
  });

  it('should render nothing is tags list empty', () => {
    const wrapper = shallow(<TagList {...defaultProps} tags={[]} />);

    expect(wrapper.find(TagListSkeleton)).toHaveLength(0);
    expect(wrapper.find(Chip)).toHaveLength(0);
  });

  it('should render right amount of tags', () => {
    const wrapper = shallow(<TagList {...defaultProps} />);

    expect(wrapper.find(TagListSkeleton)).toHaveLength(0);
    expect(wrapper.find(Chip)).toHaveLength(2);
  });

  it('should render one tag selected if selected', () => {
    const tags = [...defaultProps.tags];
    tags.push({
      id: 3,
      label: 'pluto',
      count: 4,
      selected: true,
    });
    const wrapper = shallow(<TagList {...defaultProps} tags={tags} />);

    const chips = wrapper.find(Chip);
    expect(wrapper.find(TagListSkeleton)).toHaveLength(0);
    expect(chips).toHaveLength(3);
    expect(chips.at(0).props().color).toEqual('default');
    expect(chips.at(1).props().color).toEqual('default');
    expect(chips.at(2).props().color).toEqual('primary');
  });

  it('should render only 10 tags if there are more', () => {
    const tags = [...defaultProps.tags];
    tags.push({
      id: 3,
      label: 'pluto',
      count: 4,
      selected: true,
    });
    tags.push({
      id: 4,
      label: 'venus',
      count: 2,
    });
    tags.push({
      id: 5,
      label: 'mercury',
      count: 8,
    });
    tags.push({
      id: 6,
      label: 'jupiter',
      count: 7,
    });
    tags.push({
      id: 7,
      label: 'ceres',
      count: 4,
    });
    tags.push({
      id: 8,
      label: 'saturn',
      count: 5,
    });
    tags.push({
      id: 9,
      label: 'neptune',
      count: 8,
    });
    tags.push({
      id: 10,
      label: 'uranus',
      count: 1,
    });
    tags.push({
      id: 11,
      label: 'moon',
      count: 2,
    });
    tags.push({
      id: 12,
      label: 'earth',
      count: 4,
    });
    const wrapper = shallow(<TagList {...defaultProps} tags={tags} />);

    const chips = wrapper.find(Chip);
    expect(wrapper.find(TagListSkeleton)).toHaveLength(0);
    expect(chips).toHaveLength(10);
    expect(chips.at(0).props().color).toEqual('default');
    expect(chips.at(2).props().color).toEqual('primary');
    expect(chips.at(9).props().color).toEqual('default');
  });
});
