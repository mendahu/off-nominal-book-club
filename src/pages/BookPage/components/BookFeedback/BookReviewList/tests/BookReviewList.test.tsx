import { shallow } from 'enzyme';
import BookReview from '../BookReview/BookReview';
import BookReviewList from '../BookReviewList';

describe('BookReviewList', () => {
  it('should display zero reviews if there are none', () => {
    const wrapper = shallow(
      <BookReviewList userRating={{}} userReview={{}} reviews={[]} />
    );

    expect(wrapper.find(BookReview)).toHaveLength(0);
  });

  it('should display the user review', () => {
    const mockUserReview = { id: 1 };

    const mockUserRating = {};

    const wrapper = shallow(
      <BookReviewList
        userRating={mockUserRating}
        userReview={mockUserReview}
        reviews={[]}
      />
    );

    const userReview = wrapper.find(BookReview);

    expect(userReview).toHaveLength(1);
    expect(userReview.props().review).toEqual(mockUserReview);
    expect(userReview.props().rating).toEqual(mockUserRating);
  });

  it('should display other reviews', () => {
    const mockReview1 = { id: 1, rating: 1 };
    const mockReview2 = { id: 2, rating: 2 };
    const mockRatings = [mockReview1, mockReview2];

    const wrapper = shallow(
      <BookReviewList userRating={{}} userReview={{}} reviews={mockRatings} />
    );

    const reviews = wrapper.find(BookReview);
    expect(reviews).toHaveLength(2);

    const firstReview = reviews.at(0);
    expect(firstReview.props().review).toEqual(mockReview1);
    expect(firstReview.props().rating).toEqual({ user_rating: 1 });

    const secondReview = reviews.at(1);
    expect(secondReview.props().review).toEqual(mockReview2);
    expect(secondReview.props().rating).toEqual({ user_rating: 2 });
  });

  it('should display all reviews', () => {
    const mockReview1 = { id: 1, rating: 1 };
    const mockReview2 = { id: 2, rating: 2 };
    const mockUserReview = { id: 1 };
    const mockUserRating = {};
    const mockRatings = [mockReview1, mockReview2];

    const wrapper = shallow(
      <BookReviewList
        userRating={mockUserRating}
        userReview={mockUserReview}
        reviews={mockRatings}
      />
    );

    const reviews = wrapper.find(BookReview);
    expect(reviews).toHaveLength(3);

    const userReview = reviews.at(0);
    expect(userReview.props().review).toEqual(mockUserReview);
    expect(userReview.props().rating).toEqual(mockUserRating);

    const firstReview = reviews.at(1);
    expect(firstReview.props().review).toEqual(mockReview1);
    expect(firstReview.props().rating).toEqual({ user_rating: 1 });

    const secondReview = reviews.at(2);
    expect(secondReview.props().review).toEqual(mockReview2);
    expect(secondReview.props().rating).toEqual({ user_rating: 2 });
  });
});
