import { shallow } from 'enzyme';
import BookPage, { getServerSideProps } from '../../../../pages/books/[id]';
import Message from '../../../components/Utility/Message';

//Default userData from serverSideProps
let userData = {
  user_tags: [],
  read: false,
  wishlist: false,
  fav: false,
  rating: null,
  review: null,
  name: '',
};

//default book data from serverSideProps
let book = null;

//sample book data return
const testBook = {
  id: 4,
  title: 'Roving Mars',
  fiction: true,
  google_id: '5SyZAAAAQBAJ',
  isbn13: '9781401381912',
  description:
    "Steve Squyres is the face and voice of NASA's Mars Exploration Rover mission. Squyres dreamed up the mission in 1987, saw it through from conception in 1995 to a successful landing in 2004, and serves as the principal scientist of its $400 million payload. He has gained a rare inside look at what it took for rovers Spirit and Opportunity to land on the red planet in January 2004--and knows firsthand their findings.",
  year: '2005',
  reads: '1',
  favs: '1',
  wishes: '0',
  rating: '5.0',
  authors: [{ name: 'Steven Squyres' }],
  tags: [
    { tag_id: 1, tag_name: 'mars', count: 2 },
    { tag_id: 2, tag_name: 'rovers', count: 1 },
    { tag_id: 5, tag_name: 'planetary science', count: 1 },
    { tag_id: 9, tag_name: 'spacecraft engineering', count: 1 },
    { tag_id: 17, tag_name: 'opportunity', count: 1 },
    { tag_id: 21, tag_name: 'meridiani', count: 1 },
  ],
  reviews: [
    {
      id: 1,
      user_id: 538,
      name: 'Jake Robins',
      rating: 5,
      date: '2020-04-21T16:55:03.906279+00:00',
      summary: 'What a ride! Such a great book!',
      user_review:
        "The first half of this book is just outstanding - it really shows the crazy process we have in getting a mission to Mars. I have so much respect for the engineers who made this possible. It's a must read to hear all the stories of close calls and last minute changes and problems that leap in the way of the launch pad!!!",
    },
  ],
};

describe('BookPage', () => {
  it('Should render error message if book data is null', () => {
    const wrapper = shallow(
      <BookPage book={null} userData={userData} slug={'bananarama'} />
    );
    expect(wrapper.find(Message)).toHaveLength(1);
  });

  it('Should not render error message if book does exist', () => {
    const wrapper = shallow(
      <BookPage book={testBook} userData={userData} slug={'4-roving-mars'} />
    );
    expect(wrapper.find(Message)).toHaveLength(0);
  });
});

describe('BookPage ServerSide Props', () => {
  it('should pass slug and null data for a non-existant url', async () => {
    const context = {
      params: {
        id: 'wrong-url-slug',
      },
      req: {},
    };

    const { props } = await getServerSideProps(context);

    expect(props).toEqual({
      slug: 'wrong-url-slug',
      book: null,
      userData: null,
    });
  });
});
