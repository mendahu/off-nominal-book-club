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
import ReadingHeader from "../../src/pages/ReadingPage/ReadingHeader";
import ReadingMilestones from "../../src/pages/ReadingPage/ReadingMilestones";
import ReadingMembers from "../../src/pages/ReadingPage/ReadingMembers";
import { Grid } from "@material-ui/core";
import { useReading } from "../../src/hooks/useReading/useReading";

export type ReadingPageProps = {
  reading: ApiReading;
};

const ReadingPage = ({ reading }: ReadingPageProps) => {
  const { user, loading } = useBookClubUser();
  const { snackBarContent, triggerSnackbar, closeSnackbar } = useSnackbar();

  if (!reading) {
    return (
      <Layout>
        <Message variant="warning" message="No reading found with this id." />
      </Layout>
    );
  }

  const { book, host, members, milestones, deleteReading } = useReading(
    reading
  );

  if (loading) {
    return (
      <Layout>
        <Message variant="loading" message="Validating credentials..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <Grid container>
        <Grid item xs={12}>
          <ReadingHeader
            book={book}
            host={host}
            deleteReading={deleteReading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={7}>
          <ReadingMilestones milestones={milestones} />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <ReadingMembers members={members} />
        </Grid>
      </Grid>
      <SnackbarContext.Provider value={triggerSnackbar}>
        <OnbcSnackbar content={snackBarContent} closeSnackbar={closeSnackbar} />
      </SnackbarContext.Provider>
    </Layout>
  );
};

export default ReadingPage;

export async function getServerSideProps(context) {
  const readingId = context.params?.id;

  let reading: ApiReading;

  try {
    const response = await fetchReading(readingId);

    if (!response.rows.length) {
      throw "No Reading found with that ID.";
    }

    reading = await response.rows[0];
  } catch (error) {
    reading = null;
    console.error(error);
  }

  return {
    props: {
      reading,
    },
  };
}
