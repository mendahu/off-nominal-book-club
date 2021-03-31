import Layout from "../../src/components/DefaultLayout";
import Message from "../../src/components/Utility/Message";
import ReadingHeader from "../../src/pages/ReadingPage/ReadingHeader";
import ReadingMilestones from "../../src/pages/ReadingPage/ReadingMilestones";
import ReadingMembers from "../../src/pages/ReadingPage/ReadingMembers";
import DeleteReadingDialog from "../../src/pages/ReadingPage/DeleteReadingDialog/DeleteReadingDialog";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Grid,
  Hidden,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useReading } from "../../src/hooks/useReading/useReading";
import { AccountBox, CalendarToday } from "@material-ui/icons";
import { useState } from "react";
import { useBookClubUser } from "../../lib/bookClubUser";
import { useSnackbarContext } from "../../src/contexts/SnackbarContext";
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
  deleteButton: {
    marginTop: theme.spacing(2),
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
        <ReadingHeader book={book} host={host} />
        <Grid container className={classes.root} spacing={2}>
          <Hidden xsDown={menu === "members"}>
            <Grid item xs={12} sm={6} md={7}>
              <ReadingMilestones
                milestones={milestones.list}
                hostId={host.id}
                addMilestone={milestones.add}
                removeMilestone={milestones.remove}
                milestoneLoading={milestones.loading}
              />
            </Grid>
          </Hidden>
          <Hidden xsDown={menu === "milestones"}>
            <Grid item xs={12} sm={6} md={5}>
              <ReadingMembers
                members={membership.list}
                hostId={host.id}
                joinReading={membership.join}
                leaveReading={membership.leave}
                membershipLoading={membership.loading}
              />
            </Grid>
          </Hidden>
        </Grid>
        {isOwner && (
          <Grid item xs={12} container justify="center">
            <Button
              color="secondary"
              variant="contained"
              onClick={openDialog}
              className={classes.deleteButton}
            >
              Delete Reading
            </Button>
          </Grid>
        )}
      </Layout>
      <DeleteReadingDialog
        isOpen={isDialogOpen}
        close={closeDialog}
        deleteReading={handleDelete}
        loading={isDeleting}
      />
      <Hidden smUp>
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
      </Hidden>
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
