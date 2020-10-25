const bookQueries = require('../../db/queries/books');
const userQueries = require('../../db/queries/users');
import Layout from '../../src/components/DefaultLayout';
import {
  BookTitleBar,
  BookTagList,
  BookDesc,
  BookFeedback,
  PatronPromote,
  LoginPromote,
  DataPromote,
} from '../../src/components/Bookview';
import userProfileFetcher from '../../src/helpers/userProfileFetcher';
import { Grid } from '@material-ui/core';
import { useUser } from '../../lib/user';
import Head from 'next/head';
import Message from '../../src/components/Utility/Message';
import { buildInitialTagState } from '../../src/reducers/bookTagReducer';
import { UserData, BookData } from '../../src/types/common';
import { useSnackbar, OnbcSnackbar } from '../../src/hooks/useSnackbar';
import SnackbarContext from '../../src/contexts/SnackbarContext';

const Bookview = ({ slug, book, userData }) => {
  const bookUrl = `https://books.offnominal.space/${slug}`;
  const { user, loading } = useUser();
  const { snackBarContent, triggerSnackbar, closeSnackbar } = useSnackbar();
  const userId = user?.onbc_id;

  if (!book) {
    return (
      <Layout>
        <Message
          variant="warning"
          message="Book not found. Return home and search for a different book."
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <SnackbarContext.Provider value={triggerSnackbar}>
        <Head>
          <meta property="og:url" content={bookUrl} key="url" />
          <meta
            property="og:title"
            content={book.title + ' - The Off-Nominal Book Club'}
            key="title"
          />
          <meta
            property="og:description"
            content={book.description}
            key="description"
          />
          <meta property="og:image" content={book.image_url} key="image" />

          <meta
            name="twitter:description"
            content={book.description.slice(0, 196) + '...'}
            key="twitter_description"
          />
          <meta
            name="twitter:title"
            content={book.title + ' - The Off-Nominal Book Club'}
            key="twitter_title"
          />
          <meta
            name="twitter:image"
            content={book.image_url}
            key="twitter_image"
          />
          <meta
            name="twitter:image:alt"
            content={'Book cover for ' + book.title}
            key="twitter_image_alt"
          />
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
            ratings={book.ratings}
            authors={book.authors}
            title={book.title}
            img={book.image_url}
            year={book.year}
          />
          <BookTagList
            bookId={book.id}
            tags={buildInitialTagState(book.tags, userData.user_tags)}
          />

          {!user && <LoginPromote />}
          {user &&
            (user?.isPatron ? (
              <DataPromote />
            ) : (
              <PatronPromote userId={userId} />
            ))}

          <BookDesc desc={book.description} />
          <BookFeedback
            userId={userId}
            isPatron={user?.isPatron}
            userData={userData}
            book={book}
          />
        </Grid>
        <OnbcSnackbar content={snackBarContent} closeSnackbar={closeSnackbar} />
      </SnackbarContext.Provider>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const slug: string = context.params.id;
  const bookId: number = Number(slug.split('-')[0]);

  if (!bookId) {
    return { props: { slug, book: null, userData: null } };
  }

  // Fetch book data from APIs
  const userProfile = await userProfileFetcher(context.req);
  const userId = userProfile?.onbc_id;

  const fetchBook = bookQueries.books.fetch;
  const fetchUser = userQueries.users.fetch;

  //Default user Data
  let userData: UserData = {
    user_tags: [],
    read: null,
    wishlist: null,
    fav: null,
    rating: null,
    review: null,
    name: '',
  };

  const bookResults: BookData[] = await fetchBook(bookId, userId);
  const book: BookData = bookResults.length ? bookResults[0] : null;

  if (userId) {
    const [results] = await fetchUser(userId, bookId);
    if (results) {
      userData = results;
    }
  }

  return { props: { slug, book, userData } };
}

export default Bookview;
