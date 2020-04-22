const bookQueries = require('../../db/queries/books')
const userQueries = require('../../db/queries/users')
import Layout from "../../src/components/DefaultLayout";
import {
  BookTitleBar,
  BookTagList,
  BookDesc,
  BookFeedback,
  PatronPromote,
  LoginPromote,
  DataPromote,
} from '../../src/components/Bookview'
import userProfileFetcher from '../../src/helpers/userProfileFetcher'
import { Grid, Typography } from '@material-ui/core'
import { useFetchUser } from '../../lib/user'
import Head from 'next/head'

const Bookview = ({ slug, book, userData }) => {

  const bookUrl = `https://books.offnominal.space/${slug}`
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
      <Head>
        <meta property="og:url"          content={bookUrl} key='url'/>
        <meta property="og:title"        content={book.title + " - The Off-Nominal Book Club"} key='title'/>
        <meta property="og:description"  content={book.description} key='description'/>
        <meta property="og:image"        content={book.image_url} key='image'/>

        <meta name="twitter:description" content={book.description.slice(0, 196) + '...'} key='twitter_description'/>
        <meta name="twitter:title"       content={book.title + " - The Off-Nominal Book Club"} key='twitter_title'/>
        <meta name="twitter:image"       content={book.image_url} key='twitter_image'/>
        <meta name="twitter:image:alt"   content={'Book cover for ' + book.title} key='twitter_image_alt'/>
    </Head>
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

        {!user && <LoginPromote />}
        {user && (user?.isPatron
          ? <DataPromote/>
          : <PatronPromote userId={userId} />)}

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
  const slug = context.params.id;
  const bookId = slug.split("-")[0];

  const userProfile = await userProfileFetcher(context.req)
  const userId = userProfile?.app_metadata?.onbc_id

  //Default user Data
  let userData = {
      user_tags: [],
      read: false, 
      wishlist: false, 
      fav: false, 
      rating: null, 
      review: null
    }
  
  // Fetch book data from API
  const [ book ] = await bookQueries.books.fetch(bookId, userId) || null
  if (userId) [ userData ] = await userQueries.users.fetch(userId, bookId)

  return { props: { slug, book: book, userData } };
}

export default Bookview;
