import Layout from "../../src/components/DefaultLayout";
import {
  useSnackbar,
  OnbcSnackbar,
} from "../../src/hooks/useSnackbar/useSnackbar";
import SnackbarContext from "../../src/contexts/SnackbarContext";
import { useBookClubUser } from "../../lib/bookClubUser";
import { fetchBook } from "../../db/queries/books";
import { BookData } from "../../src/types/common";
import Message from "../../src/components/Utility/Message";
import { fetchReading } from "../../db/queries/readings";

export type ReadingPageProps = {
  reading: {
    readingId: string;
    userId: string;
    bookId: string;
  };
  book: BookData;
};

const ReadingPage = (props: ReadingPageProps) => {
  const { user, loading } = useBookClubUser();
  const { snackBarContent, triggerSnackbar, closeSnackbar } = useSnackbar();

  if (!props.reading) {
    return (
      <Layout>
        <Message variant="warning" message="No reading found with this id." />
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <Message variant="loading" message="Validating credentials..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>{props.reading.readingId}</h1>
      <h1>{props.book.title}</h1>
      <SnackbarContext.Provider value={triggerSnackbar}>
        <OnbcSnackbar content={snackBarContent} closeSnackbar={closeSnackbar} />
      </SnackbarContext.Provider>
    </Layout>
  );
};

export default ReadingPage;

export async function getServerSideProps(context) {
  const readingId = context.params.id;

  let reading;

  try {
    const response = await fetchReading(readingId);
    reading = {
      bookId: response[0].book_id,
      userId: response[0].user_id,
      readingId,
    };
  } catch (error) {
    console.error("Problem querying reading data");
  }

  let book;

  try {
    const bookResults = await fetchBook(reading.bookId);
    book = bookResults.length ? bookResults[0] : null;
  } catch (error) {
    console.error("Problem querying book data");
  }

  return {
    props: {
      reading,
      book,
    },
  };
}
