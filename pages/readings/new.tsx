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
import { Button, Paper } from "@material-ui/core";
import { BookThumbnail } from "../../src/components/BookThumbnail";
import generateAuthorString from "../../src/helpers/generateAuthorString";
import axios from "axios";
import { useRouter } from "next/router";
import urlGenerator from "../../src/helpers/urlGenerator";

export type NewReadingProps = {
  book: BookData;
};

const NewReading = (props: NewReadingProps) => {
  const { user, loading } = useBookClubUser();
  const { snackBarContent, triggerSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();

  const createReading = async (bookId: number) => {
    let readingId: string;
    try {
      const response = await axios.post("/api/readings/new", { bookId });
      readingId = response.data[0];
      router.push(`/readings/${readingId}`);
    } catch (error) {
      triggerSnackbar({
        active: true,
        message:
          "Error creating the reading. Please try again or let the administrator know.",
        severity: "error",
      });
    }
  };

  if (!props.book) {
    return (
      <Layout>
        <Message
          variant="warning"
          message="Book not found. Return home and search for a different book."
        />
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

  if (!user.isPatron) {
    return (
      <Layout>
        <Message
          variant="error"
          message="Only Book Club Premium members may create readings."
        />
      </Layout>
    );
  }

  const authorString = generateAuthorString(props.book.authors);

  return (
    <Layout>
      <SnackbarContext.Provider value={triggerSnackbar}>
        <Paper>
          <h1>Creating a reading for...</h1>
          <BookThumbnail
            id={props.book.google_id}
            zoom={1}
            title={props.book.title}
            authorString={authorString}
          ></BookThumbnail>
        </Paper>
        <Paper>
          <h1>What is a reading?</h1>
          <p>
            A reading is when users come together and read a book as a group. A
            reading admin can set milestones like when the reading starts, ends,
            as well as milestones along the way for discussions.
          </p>
          <p>Sound like something you want to try?</p>
        </Paper>
        <Paper>
          <Button
            variant="contained"
            color="primary"
            onClick={() => createReading(props.book.id)}
          >
            Yes, create a reading for {props.book.title}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            href={`/books/${urlGenerator(
              props.book.id,
              authorString,
              props.book.title
            )}`}
          >
            No, take me back!
          </Button>
        </Paper>
        <OnbcSnackbar content={snackBarContent} closeSnackbar={closeSnackbar} />
      </SnackbarContext.Provider>
    </Layout>
  );
};

export default NewReading;

export async function getServerSideProps(context) {
  const bookResults = await fetchBook(context.query.bookId);
  const book = bookResults.length ? bookResults[0] : null;

  return {
    props: {
      book,
    },
  };
}
