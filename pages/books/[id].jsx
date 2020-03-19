const bookQueries = require('../../db/queries/books')
const userQueries = require('../../db/queries/users')
import Layout from "../../src/components/DefaultLayout";
import BookTitleBar from "../../src/components/Bookview/BookTitleBar";
import BookTagList from "../../src/components/Bookview/BookTagList";
import BookDesc from "../../src/components/Bookview/BookDesc";
import BookReviewList from "../../src/components/Bookview/BookReviewList";
import UserContext from '../../src/UserContext'
import { useContext } from 'react'

const Bookview = ({ book, userData }) => {

  const { userId } = useContext(UserContext)

  return (
    <Layout>
      <BookTitleBar 
        userId={userId} 
        bookId={book.id} 
        read={userData.read} 
        wishlist={userData.wishlist} 
        fav={userData.fav} 
        rating={userData.rating} 
        authors={book.authors} 
        title={book.title} 
        img={book.image_url} 
        year={book.year} 
      />
      <BookTagList 
        tags={book.tags} 
        userTags={userData.user_tags}
      />
      <BookDesc desc={book.description} />
      <BookReviewList 
        reviews={book.reviews} 
        userReview={userData.review}
      />
    </Layout>
  );
}; 

export async function getServerSideProps(context) {
  const queryId = context.params.id;
  const cookie = context.req.headers.cookie
  const userId = (cookie) ? Number(cookie.split("=")[1]) : null

  //Default user Data
  const props = {
    userData: {
      user_tags: [],
      read: false, 
      wishlist: false, 
      fav: false, 
      rating: null, 
      review: null
    }
  }
  
  // Fetch book data from API
  const promises = [];
  promises.push(bookQueries.books.fetch(queryId));
  if (userId) promises.push(userQueries.users.fetch(userId, queryId));

  return Promise.all(promises)
    .then(values => {
      props.book = values[0][0]
      if (userId) props.userData = values[1][0]
      return { props };
    })
    .catch(err => console.error(err));
}

export default Bookview;
