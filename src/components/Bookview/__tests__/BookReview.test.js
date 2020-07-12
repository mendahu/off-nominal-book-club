import { shallow } from 'enzyme';
import BookReview from '../BookReview';
import { Avatar, Typography, Link as MatLink } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

describe('BookReview', () => {
  const review = {
    avatar_url: 'http://www.example.com',
    summary: 'a summary',
    name: 'Jake',
    date: '2020-04-21T16:55:03.906279+00:00',
    user_review: 'a review',
  };

  const rating = {
    user_rating: 5,
  };

  const props = {
    rating,
    review,
  };

  it('Should render an avatar', () => {
    const wrapper = shallow(<BookReview {...props} />);
    expect(wrapper.find(Avatar)).toHaveLength(1);
  });

  it('Should render an summary', () => {
    const wrapper = shallow(<BookReview {...props} />);
    expect(wrapper.find(Typography).at(0).text()).toEqual('a summary');
  });

  it('Should render a name', () => {
    const wrapper = shallow(<BookReview {...props} />);
    expect(wrapper.find(MatLink).text()).toEqual('Jake');
  });

  it('Should not render a rating if it is 0', () => {
    const wrapper = shallow(
      <BookReview {...props} rating={{ user_rating: 0 }} />
    );
    expect(wrapper.find(Rating)).toHaveLength(0);
  });

  it('Should render a rating if it is more than 0', () => {
    const wrapper = shallow(<BookReview {...props} />);
    expect(wrapper.find(Rating)).toHaveLength(1);
  });

  it('Should render a review', () => {
    const wrapper = shallow(<BookReview {...props} />);
    expect(wrapper.find(Typography).at(2).text()).toEqual('a review');
  });
});
