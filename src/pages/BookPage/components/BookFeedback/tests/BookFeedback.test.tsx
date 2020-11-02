import { shallow } from 'enzyme';
import BookFeedback from '../BookFeedback';

describe('BookFeedback should render without crashing', () => {
  const testBook = {
    id: 1,
  };

  //Default user Data
  const userData = {
    user_tags: [],
    read: false,
    wishlist: false,
    fav: false,
    rating: null,
    review: null,
    name: '',
  };

  it('Should render without crashing', () => {
    const wrapper = shallow(
      <BookFeedback book={testBook} userData={userData} />
    );
  });
});
