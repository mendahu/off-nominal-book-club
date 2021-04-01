import Layout from "../../src/components/DefaultLayout";
import {
  BookTitleBar,
  BookDesc,
  BookFeedback,
  PatronPromote,
  LoginPromote,
  BookTagList,
  ReadingButton,
} from "../../src/pages/BookPage/components";
import userProfileFetcher from "../../src/helpers/userProfileFetcher";
import { Grid } from "@material-ui/core";
import Message from "../../src/components/Utility/Message";
import { buildInitialTagState } from "../../src/reducers/bookTagReducer/bookTagReducer";
import { UserData, BookData } from "../../src/types/common";
import generateAuthorString from "../../src/helpers/generateAuthorString";
import { MetaFlagData } from "../../src/components/BookStats/MetaFlags/MetaFlags";
import { fetchBook } from "../../db/queries/books";
import { fetchUser } from "../../db/queries/users";
import { generateBookThumbnailUrl } from "../../src/helpers/generateBookThumbnailUrl";
import { useBookClubUser } from "../../lib/bookClubUser";
import getAuth0USerSub from "../../src/helpers/auth0/auth0Sub";
import CommonHead from "../../src/components/CommonHead/CommonHead";

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
    const thumbnail = generateBookThumbnailUrl(book.google_id, 2);
    return (
      <Layout>
        <CommonHead
          title={book.title + " - The Space Book Club"}
          desc={book.description.slice(0, 196) + "..."}
          url={bookUrl}
          ogImage={{
            url: thumbnail,
            alt: book.title,
            contentType: "image/jpeg",
          }}
          twitterImage={{
            url: thumbnail,
            alt: book.title,
          }}
        />
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
