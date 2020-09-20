import { shallow } from 'enzyme';
import SearchBar, { SearchBarProps } from '../SearchBar';
import { InputBase, Button } from '@material-ui/core';
import Link from 'next/link';

describe('SearchBar', () => {
  const mockClick = jest.fn();
  const mockChange = jest.fn();

  const defaultProps: SearchBarProps = {
    placeholderText: 'Search',
    text: 'Mars',
    onChange: mockChange,
    button: {
      href: 'www.example.com',
      text: 'Button',
      onClick: mockClick,
    },
  };

  beforeEach(() => {
    mockClick.mockClear();
    mockChange.mockClear();
  });

  it('Should render an inputBase', () => {
    const wrapper = shallow(<SearchBar {...defaultProps} />);
    expect(wrapper.find(InputBase)).toHaveLength(1);
  });

  it('Should not render a button', () => {
    const wrapper = shallow(<SearchBar {...defaultProps} button={null} />);
    expect(wrapper.find(Button)).toHaveLength(0);
  });

  it('Should render an a button with a href', () => {
    const wrapper = shallow(<SearchBar {...defaultProps} />);
    expect(wrapper.find(Link)).toHaveLength(1);
    expect(wrapper.find(Button).text()).toEqual('Button');
  });

  it('Should not render an a button with a href', () => {
    const wrapper = shallow(
      <SearchBar
        {...defaultProps}
        button={{ text: 'a non href button', onClick: jest.fn() }}
      />
    );
    expect(wrapper.find(Link)).toHaveLength(0);
    expect(wrapper.find(Button).text()).toEqual('a non href button');
  });

  it('Should fire proper function when clicked', () => {
    const wrapper = shallow(
      <SearchBar
        {...defaultProps}
        button={{ text: 'a non href button', onClick: mockClick }}
      />
    );
    wrapper.find(Button).simulate('click');
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('Should fire proper function when changes', () => {
    const wrapper = shallow(<SearchBar {...defaultProps} />);
    wrapper.find(InputBase).simulate('change');
    expect(mockChange).toHaveBeenCalledTimes(1);
  });
});
