import Layout from "../../src/components/DefaultLayout";
import {
  useSnackbar,
  OnbcSnackbar,
} from "../../src/hooks/useSnackbar/useSnackbar";
import SnackbarContext from "../../src/contexts/SnackbarContext";
import { useBookClubUser } from "../../lib/bookClubUser";
import Message from "../../src/components/Utility/Message";
import { fetchReading } from "../../db/queries/readings";
import { ApiReading } from "../../src/types/api/apiTypes";
import { Paper } from "@material-ui/core";
import ReadingHeader from "../../src/pages/ReadingPage/ReadingHeader";
import ReadingMilestones from "../../src/pages/ReadingPage/ReadingMilestones";

export type ReadingPageProps = {
  reading: ApiReading;
};

const ReadingPage = ({ reading }: ReadingPageProps) => {
  const { user, loading } = useBookClubUser();
  const { snackBarContent, triggerSnackbar, closeSnackbar } = useSnackbar();

  const { id, book, host, members, milestones } = reading;

  if (!reading) {
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
      <ReadingHeader book={book} host={host} />
      <ReadingMilestones />
      <Paper></Paper>
      <SnackbarContext.Provider value={triggerSnackbar}>
        <OnbcSnackbar content={snackBarContent} closeSnackbar={closeSnackbar} />
      </SnackbarContext.Provider>
    </Layout>
  );
};

export default ReadingPage;

export async function getServerSideProps(context) {
  const readingId = context.params.id;

  let reading: ApiReading;

  try {
    const response = await fetchReading(readingId);

    console.log(response.rows);

    if (!response.rows.length) {
      throw "No Reading found with that ID.";
    }

    reading = await response.rows[0];
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      reading,
    },
  };
}
