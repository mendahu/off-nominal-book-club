import Layout from "../../src/components/DefaultLayout";
import {
  useSnackbar,
  OnbcSnackbar,
} from "../../src/hooks/useSnackbar/useSnackbar";
import SnackbarContext from "../../src/contexts/SnackbarContext";
import { useBookClubUser } from "../../lib/bookClubUser";
import Message from "../../src/components/Utility/Message";
import ReadingHeader from "../../src/pages/ReadingPage/ReadingHeader";
import ReadingMilestones from "../../src/pages/ReadingPage/ReadingMilestones";
import ReadingMembers from "../../src/pages/ReadingPage/ReadingMembers";
import { Grid } from "@material-ui/core";
import { useReading } from "../../src/hooks/useReading/useReading";

export type ReadingPageProps = {
  readingId: string;
};

const ReadingPage = (props: ReadingPageProps) => {
  const { user, loading } = useBookClubUser();
  const { snackBarContent, triggerSnackbar, closeSnackbar } = useSnackbar();

  const {
    loadingReading,
    error,
    book,
    host,
    members,
    milestones,
    deleteReading,
  } = useReading(props.readingId);

  if (error) {
    return (
      <Layout>
        <Message
          variant="error"
          message="Failed to load reading. This reading id may not exist or there was a server error."
        />
      </Layout>
    );
  }

  if (loadingReading) {
    return (
      <Layout>
        <Message variant="loading" message="Loading reading..." />
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

  return {
    props: {
      readingId,
    },
  };
}
