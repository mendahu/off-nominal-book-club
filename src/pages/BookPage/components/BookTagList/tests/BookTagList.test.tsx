import { shallow } from 'enzyme';
import { BookTagInput, BookTagList } from '../..';
import { BookTagListProps } from '../BookTagList';
import { useUser } from '../../../../../../lib/user';
import { Chip, CircularProgress } from '@material-ui/core';
import { JoinedTag } from '../../../../../types/common';
// import SnackbarContext from '../../../../../contexts/SnackbarContext';

jest.mock('../../../../../../lib/user');

const test_noUserTags = [
  { loading: false, tag_id: 1, tag_name: 'tag1', count: 2 },
  { loading: false, tag_id: 2, tag_name: 'tag2', count: 1 },
  { loading: false, tag_id: 3, tag_name: 'tag3', count: 3 },
];

const test_someUserTags = [
  { loading: false, tag_id: 1, tag_name: 'tag1', count: 4 },
  { loading: false, tag_id: 2, tag_name: 'tag2', count: 5, tagRelId: 1 },
  { loading: false, tag_id: 3, tag_name: 'tag3', count: 6, tagRelId: 2 },
];

const test_allUserTags = [
  { loading: false, tag_id: 1, tag_name: 'tag1', count: 2, tagRelId: 3 },
  { loading: false, tag_id: 2, tag_name: 'tag2', count: 1, tagRelId: 1 },
  { loading: false, tag_id: 3, tag_name: 'tag3', count: 3, tagRelId: 2 },
];

const test_oneUserTag: JoinedTag = {
  loading: false,
  tag_id: 4,
  tag_name: 'tag4',
  count: 5,
  tagRelId: 4,
};
const test_oneNonUserTag: JoinedTag = {
  loading: false,
  tag_id: 5,
  tag_name: 'tag5',
  count: 4,
};

const test_oneLoadingUserTag: JoinedTag = {
  loading: true,
  tag_id: 6,
  tag_name: 'tag6',
  count: 5,
  tagRelId: 5,
};

const mockTriggerSnackbar = jest.fn();

const defaultProps: BookTagListProps = {
  bookId: 5,
  tags: test_someUserTags,
};

describe('BookTagList', () => {
  beforeEach(() => {
    mockTriggerSnackbar.mockClear();

    useUser.mockImplementation(() => ({
      user: { onbc_id: 1, isPatron: true },
      loading: false,
      resetUserPatreonState: jest.fn(),
    }));
  });

  it('should render correct amount and colors of tags', () => {
    const wrapper = shallow(<BookTagList {...defaultProps} />);
    const tags = wrapper.find(Chip);
    expect(tags).toHaveLength(3);

    const colors = tags.map((node) => node.prop('color'));
    expect(colors.filter((color) => color === 'primary')).toHaveLength(2);

    expect(wrapper.find(BookTagInput)).toHaveLength(1);
  });

  it('Should not display any tags if tags prop is empty', () => {
    const wrapper = shallow(<BookTagList {...defaultProps} tags={[]} />);
    expect(wrapper.find(Chip)).toHaveLength(0);
    expect(wrapper.find(BookTagInput)).toHaveLength(1);
  });

  // it('calls the toggleTag function when clicked', () => {
  //   const handleClick = jest.fn();
  //   const wrapper = shallow(
  //     <BookTagItem tagData={test_oneUserTag} handleClick={handleClick} />
  //   );

  //   wrapper.find(Chip).simulate('click');
  //   expect(handleClick).toHaveBeenCalledTimes(1);
  // });

  // it('Should not allow unauthenticated users to increment tags', async () => {
  //   const wrapper = mount(
  //     <SnackbarContext.Provider value={mockTriggerSnackbar}>
  //       <BookTagList
  //         tags={[test_oneNonUserTag]}
  //         userId={undefined}
  //         isPatron={undefined}
  //         bookId={1}
  //       />
  //     </SnackbarContext.Provider>
  //   );

  //   const tag = wrapper.find(Chip);
  //   act(() => {
  //     tag.at(0).simulate('click');
  //   });
  //   expect(tag.at(0).text()).toMatch(/4/);
  //   expect(mockTriggerSnackbar).toHaveBeenCalledTimes(1);
  // });

  // it('Should not allow non patron users to increment tags', async () => {
  //   const wrapper = mount(
  //     <SnackbarContext.Provider value={mockTriggerSnackbar}>
  //       <BookTagList
  //         tags={[test_oneNonUserTag]}
  //         userId={1}
  //         isPatron={false}
  //         bookId={1}
  //       />
  //     </SnackbarContext.Provider>
  //   );

  //   const tag = wrapper.find(Chip);
  //   act(() => {
  //     tag.at(0).simulate('click');
  //   });
  //   expect(tag.at(0).text()).toMatch(/4/);
  //   expect(mockTriggerSnackbar).toHaveBeenCalledTimes(1);
  // });
});
