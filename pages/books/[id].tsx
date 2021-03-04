import Layout from "../../src/components/DefaultLayout";
import {
  BookTitleBar,
  BookDesc,
  BookFeedback,
  PatronPromote,
  LoginPromote,
  DataPromote,
  BookTagList,
  ReadingButton,
} from "../../src/pages/BookPage/components";
import userProfileFetcher from "../../src/helpers/userProfileFetcher";
import { Grid } from "@material-ui/core";
import Head from "next/head";
import Message from "../../src/components/Utility/Message";
import { buildInitialTagState } from "../../src/reducers/bookTagReducer/bookTagReducer";
import { UserData, BookData } from "../../src/types/common";
import {
  useSnackbar,
  OnbcSnackbar,
} from "../../src/hooks/useSnackbar/useSnackbar";
import SnackbarContext from "../../src/contexts/SnackbarContext";
import generateAuthorString from "../../src/helpers/generateAuthorString";
import { MetaFlagData } from "../../src/components/BookStats/MetaFlags/MetaFlags";
import { fetchBook } from "../../db/queries/books";
import { fetchUser } from "../../db/queries/users";
import { generateBookThumbnailUrl } from "../../src/helpers/generateBookThumbnailUrl";
import { useBookClubUser } from "../../lib/bookClubUser";
import getAuth0USerSub from "../../src/helpers/auth0/auth0Sub";

export const generateMetaData = (bookData, userData): MetaFlagData => {
  return {
    reads: {
      count: Number(bookData.reads),
      id: userData.read,
      loading: false,
    },
    wishlist: {
      count: Number(bookData.wishlist),
      id: userData.wishlist,
      loading: false,
    },
    favourites: {
      count: Number(bookData.favourites),
      id: userData.fav,
      loading: false,
    },
  };
};

export const generateRatingString = (rating, count) => {
  const score = rating || "-";
  return `${score} (${count} rating${Number(count) === 1 ? "" : "s"})`;
};

export type BookPageProps = {
  slug: string;
  book: BookData;
  userData: UserData;
};

const BookPage = ({ slug, book, userData }: BookPageProps) => {
  const bookUrl = `https://books.offnominal.space/${slug}`;
  const { user, loading } = useBookClubUser();
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
  } else {
    const thumbnail = generateBookThumbnailUrl(book.google_id, 1);
    return (
      <Layout>
        <SnackbarContext.Provider value={triggerSnackbar}>
          <Head>
            <meta property="og:url" content={bookUrl} key="url" />
            <meta
              property="og:title"
              content={book.title + " - The Off-Nominal Book Club"}
              key="title"
            />
            <meta
              property="og:description"
              content={book.description}
              key="description"
            />
            <meta property="og:image" content={thumbnail} key="image" />

            <meta
              name="twitter:description"
              content={book.description.slice(0, 196) + "..."}
              key="twitter_description"
            />
            <meta
              name="twitter:title"
              content={book.title + " - The Off-Nominal Book Club"}
              key="twitter_title"
            />
            <meta
              name="twitter:image"
              content={thumbnail}
              key="twitter_image"
            />
            <meta
              name="twitter:image:alt"
              content={"Book cover for " + book.title}
              key="twitter_image_alt"
            />
          </Head>
          <Grid container spacing={2}>
            <BookTitleBar
              bookId={book.id}
              metaData={generateMetaData(book, userData)}
              ratingString={generateRatingString(book.rating, book.ratings)}
              authorString={generateAuthorString(book.authors)}
              title={book.title}
              googleId={book.google_id}
              year={book.year}
              type={book.type}
            />
            <BookTagList
              bookId={book.id}
              tags={buildInitialTagState(book.tags, userData.user_tags)}
            />

            {!user && <LoginPromote />}
            {user &&
              (user?.isPatron ? (
                <ReadingButton bookId={book.id} />
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
          <OnbcSnackbar
            content={snackBarContent}
            closeSnackbar={closeSnackbar}
          />
        </SnackbarContext.Provider>
      </Layout>
    );
  }
};

export async function getServerSideProps(context) {
  const slug: string = context.params.id;
  const bookId: number = Number(slug.split("-")[0]);

  if (!bookId) {
    return { props: { slug, book: null, userData: null } };
  }

  // Fetch book data from APIs
  const sub = await getAuth0USerSub(context.req, context.res);
  const userProfile = await userProfileFetcher(sub);
  const userId = userProfile?.onbc_id;

  //Default user Data
  let userData: UserData = {
    user_tags: [],
    read: null,
    wishlist: null,
    fav: null,
    rating: null,
    review: null,
    name: "",
  };

  const bookResults = await fetchBook(bookId, userId);
  const book = bookResults.length ? bookResults[0] : null;

  if (userId) {
    const [results] = await fetchUser(userId, bookId);
    if (results) {
      userData = results;
    }
  }

  return { props: { slug, book, userData } };
}

export default BookPage;
