import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import BookTitleBar from '../BookTitleBar';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('BookDescription', () => {
  it('Should render without crashing', () => {
    const wrapper = shallow(<BookTitleBar authors={['Jake', 'Anthony']} />);
  });
});
