import { Paper, Typography } from '@material-ui/core';
import { mount, shallow } from 'enzyme';
import New from '../../../../pages/books/new';
import { useFetchUser } from '../../../../lib/user';
import Message from '../../Utility/Message';
import SearchBar from '../../SearchBar';
import axios from 'axios';
import mockGoogleResult from './mocks/mockGoogleResponse.json';
import SearchResult from '../SearchResult';
import { useDebounce } from '../../../hooks/useDebounce';
jest.mock('../../../../lib/user');
jest.mock('axios');
jest.mock('../../../hooks/useDebounce');

useFetchUser.mockImplementation(() => ({
  user: {
    isPatron: true,
  },
  loading: false,
}));

useDebounce.mockImplementation((term, delay) => term);

describe('SearchResult should render without crashing', () => {
  it('should render an authenticating message if user is loading', () => {
    useFetchUser.mockImplementationOnce(() => ({
      user: undefined,
      loading: true,
    }));

    const wrapper = shallow(<New />);
    const message = wrapper.find(Message);
    expect(message).toHaveLength(1);
    expect(message.props().message).toEqual('Validating credentials...');
  });

  it('should render an error message if user is not authenticated', () => {
    useFetchUser.mockImplementationOnce(() => ({
      user: undefined,
      loading: false,
    }));

    const wrapper = shallow(<New />);
    const message = wrapper.find(Message);
    expect(message).toHaveLength(1);
    expect(message.props().message).toEqual(
      'You must be logged in and a Patron to add books.'
    );
  });

  it('should render welcome box and search bar', () => {
    const wrapper = shallow(<New />);
    const paper = wrapper.find(Paper);
    expect(paper).toHaveLength(1);
    expect(paper.find(Typography).at(0).text()).toEqual(
      'Help grow the Off-Nominal Book Club'
    );
    expect(wrapper.find(SearchBar)).toHaveLength(1);
  });

  // it('should render search results when search bar changes and API call succeeds', () => {
  //   axios.get.mockImplementationOnce(() => mockGoogleResult);
  //   const wrapper = mount(<New />);
  //   wrapper.find(SearchBar).simulate('change', { target: { value: 'Mars' } });
  //   wrapper.setState({ searchTerm: 'Mars ' });
  //   expect(axios.get).toHaveBeenCalledTimes(1);
  //   //expect(wrapper.find(SearchResult)).toHaveLength(20);
  // });
});
