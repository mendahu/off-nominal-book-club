const bookQueries = require('../../db/queries/books')
const userQueries = require('../../db/queries/users')
import Layout from "../../src/components/DefaultLayout";
import BookTitleBar from "../../src/components/Bookview/BookTitleBar";
import BookTagList from "../../src/components/Bookview/BookTagList";
import BookDesc from "../../src/components/Bookview/BookDesc";
import BookFeedback from "../../src/components/Bookview/BookFeedback";
import ReadingButton from "../../src/components/Bookview/ReadingButton";
import LoginPromote from "../../src/components/Bookview/LoginPromote";
import auth0 from '../../lib/auth0'
import userProfileFetcher from '../../src/helpers/userProfileFetcher'
import { Grid, Typography } from '@material-ui/core'
import { useFetchUser } from '../../lib/user'

const Bookview = ({ book, userData }) => {

  const { user, loading } = useFetchUser();
  const userId = user?.app_metadata?.onbc_id

  if (!book) {
    return (
      <Layout>
        <Typography>The book URL you've come to is not in our database. Return home and search for a different book.</Typography>
      </Layout>
    )
  }

  return (
    <Layout>
      <Grid container spacing={2}>
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

        {user?.isPatron
          ? <ReadingButton
            bookId={book.id}/>
          : <LoginPromote />}

        <BookDesc desc={book.description}/>
        <BookFeedback 
          loggedIn={user?.isPatron}
          userId={userId}
          userName={userData.name}
          bookId={book.id}
          reviews={book.reviews} 
          userReview={userData.review}
          userRating={userData.rating}
        />
      </Grid>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const queryId = context.params.id.split("-")[0];

  const userProfile = await userProfileFetcher(context.req)
  const userId = userProfile?.app_metadata?.onbc_id

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
      props.book = values[0][0] || null
      if (userId) props.userData = values[1][0]
      return { props };
    })
    .catch(err => console.error(err));
}

export default Bookview;
