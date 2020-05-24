import { shallow, mount } from 'enzyme';
import BookTagList from '../BookTagList';
import BookTagItem from '../BookTagItem';
import { Chip } from '@material-ui/core';
import { act } from 'react-dom/test-utils';

const test_noUserTags = [
  { id: 1, tag_name: 'tag1', count: 2 },
  { id: 2, tag_name: 'tag2', count: 1 },
  { id: 3, tag_name: 'tag3', count: 3 },
];

const test_someUserTags = [
  { id: 1, tag_name: 'tag1', count: 4 },
  { id: 2, tag_name: 'tag2', count: 5, tagRelId: 1 },
  { id: 3, tag_name: 'tag3', count: 6, tagRelId: 2 },
];

const test_allUserTags = [
  { id: 1, tag_name: 'tag1', count: 2, tagRelId: 3 },
  { id: 2, tag_name: 'tag2', count: 1, tagRelId: 1 },
  { id: 3, tag_name: 'tag3', count: 3, tagRelId: 2 },
];

const test_oneUserTag = { id: 2, tag_name: 'tag2', count: 5, tagRelId: 1 };
const test_oneNonUserTag = { id: 1, tag_name: 'tag1', count: 4 };

describe('BookTagList', () => {
  it('Should not display any tags if tags prop is empty', () => {
    const wrapper = shallow(<BookTagList tags={[]} />);
    expect(wrapper.find(BookTagItem)).toHaveLength(0); //no user tags
    expect(wrapper.find(Chip)).toHaveLength(1); //one add tag button
  });

  it('Should display the right amount of tags with no user tags added', () => {
    const wrapper = shallow(<BookTagList tags={test_noUserTags} />);
    expect(wrapper.find(BookTagItem)).toHaveLength(3); //no user tags
    expect(wrapper.find(Chip)).toHaveLength(1); //one add tag button
  });

  it('Should display the right amount of tags with some user tags added', () => {
    const wrapper = shallow(<BookTagList tags={test_someUserTags} />);
    expect(wrapper.find(BookTagItem)).toHaveLength(3); //no user tags
    expect(wrapper.find(Chip)).toHaveLength(1); //one add tag button
  });

  it('Should display the right amount of tags with user tags added', () => {
    const wrapper = shallow(<BookTagList tags={test_allUserTags} />);
    expect(wrapper.find(BookTagItem)).toHaveLength(3); //no user tags
    expect(wrapper.find(Chip)).toHaveLength(1); //one add tag button
  });

  it('userTags and non userTags should render the right colour andd with the right count and text', () => {
    const wrapper = mount(<BookTagList tags={test_someUserTags} />);

    const userTags = wrapper.find('div.MuiChip-clickableColorPrimary');
    const allTags = wrapper.find('div.MuiChip-clickable');

    expect(allTags).toHaveLength(4);
    expect(userTags).toHaveLength(2);
    expect(userTags.at(0).text()).toMatch(/tag2/);
    expect(userTags.at(0).text()).toMatch(/5/);
    expect(userTags.at(1).text()).toMatch(/tag3/);
    expect(userTags.at(1).text()).toMatch(/6/);
    expect(allTags.at(0).text()).toMatch(/tag1/);
    expect(allTags.at(0).text()).toMatch(/4/);
  });

  it('calls the toggleTag function when clicked', () => {
    const handleClick = jest.fn();
    const wrapper = shallow(
      <BookTagItem tagData={test_oneUserTag} handleClick={handleClick} />
    );

    wrapper.find(Chip).simulate('click');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Should not allow unauthenticated users to increment tags', async () => {
    const promise = Promise.resolve();
    jest.spyOn(window, 'alert').mockImplementation(() => promise);

    const wrapper = mount(
      <BookTagList
        tags={[test_oneNonUserTag]}
        userId={undefined}
        isPatron={undefined}
        bookId={1}
      />
    );

    const tag = wrapper.find(Chip);
    tag.at(0).simulate('click');
    expect(tag.at(0).text()).toMatch(/4/);
    await act(() => promise);
  });

  it('Should not allow non patron users to increment tags', async () => {
    const promise = Promise.resolve();
    jest.spyOn(window, 'alert').mockImplementation(() => promise);

    const wrapper = mount(
      <BookTagList
        tags={[test_oneNonUserTag]}
        userId={1}
        isPatron={false}
        bookId={1}
      />
    );

    const tag = wrapper.find(Chip);
    tag.at(0).simulate('click');
    expect(tag.at(0).text()).toMatch(/4/);
    await act(() => promise);
  });
});
