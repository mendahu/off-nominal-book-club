import Layout from "../../src/components/DefaultLayout";
import Message from "../../src/components/Utility/Message";
import ReadingHeader from "../../src/pages/ReadingPage/ReadingHeader";
import ReadingMilestones from "../../src/pages/ReadingPage/ReadingMilestones";
import ReadingMembers from "../../src/pages/ReadingPage/ReadingMembers";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useReading } from "../../src/hooks/useReading/useReading";
import { AccountBox, CalendarToday } from "@material-ui/icons";
import { useState } from "react";
import { useBookClubUser } from "../../lib/bookClubUser";
import { useSnackbarContext } from "../../src/contexts/SnackbarContext";
import DeleteReadingDialog from "../../src/pages/ReadingPage/DeleteReadingDialog/DeleteReadingDialog";
import { useDeleteReading } from "../../src/pages/ReadingPage/useDeleteReading/useDeleteReading";

export type ReadingPageProps = {
  readingId: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  menu: {
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
}));

const ReadingPage = (props: ReadingPageProps) => {
  const classes = useStyles();
  const { user, loading } = useBookClubUser();
  const {
    loadingReading,
    error,
    book,
    host,
    membership,
    milestones,
    deleteReading,
  } = useReading(props.readingId);
  const {
    isDeleting,
    setIsDeleting,
    isDialogOpen,
    openDialog,
    closeDialog,
  } = useDeleteReading();

  const triggerSnackbar = useSnackbarContext();

  const [menu, setMenu] = useState("milestones");

  let isOwner = false;

  const handleDelete = () => {
    setIsDeleting(true);
    deleteReading().catch((err) => {
      setIsDeleting(false);
      triggerSnackbar({
        active: true,
        variant: "error",
        message: "Error deleting the Reading.",
      });
    });
  };

  if (!loading) {
    isOwner = Number(host.id) === user.onbc_id;
  }

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
    <>
      <Layout>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <ReadingHeader book={book} host={host} />
          </Grid>
          {menu === "milestones" && (
            <Grid item xs={12}>
              <ReadingMilestones
                milestones={milestones.list}
                hostId={host.id}
                addMilestone={milestones.add}
                removeMilestone={milestones.remove}
                milestoneLoading={milestones.loading}
              />
            </Grid>
          )}
          {menu === "members" && (
            <Grid item xs={12}>
              <ReadingMembers
                members={membership.list}
                hostId={host.id}
                joinReading={membership.join}
                leaveReading={membership.leave}
                membershipLoading={membership.loading}
              />
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} container justify="center">
          <Button color="secondary" variant="contained" onClick={openDialog}>
            Delete Reading
          </Button>
        </Grid>
      </Layout>
      <DeleteReadingDialog
        isOpen={isDialogOpen}
        close={closeDialog}
        deleteReading={handleDelete}
        loading={isDeleting}
      />
      <BottomNavigation
        value={menu}
        showLabels
        onChange={(event, newValue) => setMenu(newValue)}
        className={classes.menu}
      >
        <BottomNavigationAction
          value="milestones"
          label={"Milestones"}
          icon={<CalendarToday />}
        />
        <BottomNavigationAction
          value="members"
          label={"Members"}
          icon={<AccountBox />}
        />
      </BottomNavigation>
    </>
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
