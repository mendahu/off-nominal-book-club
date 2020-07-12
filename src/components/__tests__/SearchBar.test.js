import { shallow } from 'enzyme';
import SearchBar from '../SearchBar';
import { InputBase, Button } from '@material-ui/core';
import Link from 'next/link';

const defaultProps = {
  button: {
    href: 'www.example.com',
  },
};

describe('SearchBar', () => {
  it('Should render an inputBase', () => {
    const wrapper = shallow(<SearchBar {...defaultProps} />);
    expect(wrapper.find(InputBase)).toHaveLength(1);
  });
  it('Should render an a button with a href', () => {
    const wrapper = shallow(
      <SearchBar button={{ href: 'www.example.com', text: 'a href button' }} />
    );
    expect(wrapper.find(Link)).toHaveLength(1);
    expect(wrapper.find(Button).text()).toEqual('a href button');
  });
  it('Should not render an a button with a href', () => {
    const wrapper = shallow(
      <SearchBar button={{ text: 'a non href button' }} />
    );
    expect(wrapper.find(Link)).toHaveLength(0);
    expect(wrapper.find(Button).text()).toEqual('a non href button');
  });
  it('Should fire proper function when clicked', () => {
    const mockClick = jest.fn();
    const wrapper = shallow(
      <SearchBar button={{ text: 'a non href button', onClick: mockClick }} />
    );
    wrapper.find(Button).simulate('click');
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
