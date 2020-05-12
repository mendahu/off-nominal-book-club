import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import BookTagList from '../BookTagList';
import BookTagItem from '../BookTagItem';
import { Chip } from '@material-ui/core';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('BookTagList', () => {
  it('Should not display any tags if tags prop is empty', () => {
    const wrapper = shallow(<BookTagList tags={[]} />);
    expect(wrapper.find(BookTagItem)).toHaveLength(0); //no user tags
    expect(wrapper.find(Chip)).toHaveLength(1); //one add tag button
  });

  it('Should display the right amount of tags with no user tags added', () => {
    const testTags = [
      { id: 1, tag_name: 'tag1', count: 2 },
      { id: 2, tag_name: 'tag2', count: 1 },
      { id: 3, tag_name: 'tag3', count: 3 },
    ];

    const wrapper = shallow(<BookTagList tags={testTags} />);
    expect(wrapper.find(BookTagItem)).toHaveLength(3); //no user tags
    expect(wrapper.find(Chip)).toHaveLength(1); //one add tag button
  });

  it('Should display the right amount of tags with some user tags added', () => {
    const testTags = [
      { id: 1, tag_name: 'tag1', count: 2 },
      { id: 2, tag_name: 'tag2', count: 1, tagRelId: 1 },
      { id: 3, tag_name: 'tag3', count: 3, tagRelId: 2 },
    ];

    const wrapper = shallow(<BookTagList tags={testTags} />);
    expect(wrapper.find(BookTagItem)).toHaveLength(3); //no user tags
    expect(wrapper.find(Chip)).toHaveLength(1); //one add tag button
  });

  it('Should display the right amount of tags with user tags added', () => {
    const testTags = [
      { id: 1, tag_name: 'tag1', count: 2, tagRelId: 3 },
      { id: 2, tag_name: 'tag2', count: 1, tagRelId: 1 },
      { id: 3, tag_name: 'tag3', count: 3, tagRelId: 2 },
    ];

    const wrapper = shallow(<BookTagList tags={testTags} />);
    expect(wrapper.find(BookTagItem)).toHaveLength(3); //no user tags
    expect(wrapper.find(Chip)).toHaveLength(1); //one add tag button
  });
});
