import Layout from "../../src/components/DefaultLayout";
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
  const {
    loadingReading,
    error,
    book,
    host,
    membership,
    milestones,
    deleteReading,
  } = useReading(props.readingId);

  if (error) {
    return (
      <Layout>
        <Message
          variant="warning"
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
          <ReadingMilestones
            milestones={milestones.list}
            hostId={host.id}
            addMilestone={milestones.add}
            removeMilestone={milestones.remove}
            milestoneLoading={milestones.loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <ReadingMembers
            members={membership.list}
            hostId={host.id}
            joinReading={membership.join}
            leaveReading={membership.leave}
            membershipLoading={membership.loading}
          />
        </Grid>
      </Grid>
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