const bookQueries = require('../../db/queries/books')
const userQueries = require('../../db/queries/users')
import Layout from "../../src/components/DefaultLayout";
import BookTitleBar from "../../src/components/Bookview/BookTitleBar";
import BookTagList from "../../src/components/Bookview/BookTagList";
import BookDesc from "../../src/components/Bookview/BookDesc";
import BookReviewList from "../../src/components/Bookview/BookReviewList";
import UserContext from '../../src/UserContext'
import { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  contentContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "space-between"
  },
  content: {
    width: '100%'
  }
}));

const Bookview = ({ book, userData }) => {

  const classes = useStyles();

  const { userId } = useContext(UserContext)

  return (
    <Layout>
      <BookTitleBar 
        userId={userId} 
        bookId={book.id} 

        userRead={userData.read} 
        userFav={userData.fav}
        userWishlist={userData.wishlist} 

        reads={book.reads}
        favs={book.favs}
        wishes={book.wishes}

        rating={book.rating} 
        authors={book.authors} 
        title={book.title} 
        img={book.image_url} 
        year={book.year} 
      />
      <BookTagList 
        userId={userId}
        bookId={book.id}
        tags={book.tags} 
        userTags={userData.user_tags}
      />
      <Box className={classes.contentContainer}>
        <BookDesc desc={book.description} className={classes.content}/>
        <BookReviewList 
          userId={userId}
          bookId={book.id}
          reviews={book.reviews} 
          userReview={userData.review}
          userRating={userData.rating}
          className={classes.content}
        />
      </Box>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const queryId = context.params.id.split("-")[0];
  const cookie = context.req.headers.cookie
  const userId = (cookie) ? Number(cookie.split("=")[1]) : 0

  
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
  promises.push(bookQueries.books.fetch(queryId, userId));
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
