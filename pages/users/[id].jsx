import { useState, useEffect } from "react";
import {
  ProfileImage,
  ProfileHeader,
  ProfileData,
  ProfileBookList,
} from "../../src/pages/UserPage";
import Layout from "../../src/components/DefaultLayout";
import Message from "../../src/components/Utility/Message";
import {
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  Link,
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import axios from "axios";
import {
  useSnackbar,
  OnbcSnackbar,
} from "../../src/hooks/useSnackbar/useSnackbar";
import SnackbarContext from "../../src/contexts/SnackbarContext";
import WarningIcon from "@material-ui/icons/Warning";
import { useBookClubUser } from "../../lib/bookClubUser";

const Userview = ({ userId, showModal }) => {
  const { user, loading } = useBookClubUser();
  const { snackBarContent, triggerSnackbar, closeSnackbar } = useSnackbar();
  const [modalOpen, setModalOpen] = useState(showModal);
  const [profileData, setProfileData] = useState({
    loading: true,
    error: true,
  });

  const renderModal = (isPatron) => (
    <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
      <DialogTitle>Welcome to your Profile Page!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Just a few more steps to complete your profile:
        </DialogContentText>
        <ol>
          <DialogContentText>
            <li>Update your name and bio at the top!</li>
            {isPatron ? (
              <li>
                Choose between your{" "}
                <Link
                  href="https://www.gravatar.com"
                  target="_blank"
                  rel="noopener"
                >
                  Gravatar
                </Link>{" "}
                or the Avatar from Patreon to display here and next to your
                reviews.
              </li>
            ) : (
              <li>
                Your profile picture comes from{" "}
                <Link
                  href="https://www.gravatar.com"
                  target="_blank"
                  rel="noopener"
                >
                  Gravatar
                </Link>
                . You can customize it there.
              </li>
            )}
            <li>
              Subscribe or unsubscribe to very occasional emails about the site.
            </li>
          </DialogContentText>
        </ol>

        <Grid container spacing={1} alignItems="center">
          <Grid item xs={2} sm={1}>
            <WarningIcon />
          </Grid>
          <Grid item xs={10} sm={11}>
            <DialogContentText>
              The content on this page is public-facing, so don't expose your
              deepest darkest secrets here!
            </DialogContentText>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setModalOpen(false)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/users/${userId}`);
        setProfileData({
          ...data,
          loading: false,
          error: false,
        });
      } catch (error) {
        setProfileData({
          ...profileData,
          loading: false,
        });
      }
    };

    fetchData();
  }, []);

  if (profileData.loading || loading) {
    return (
      <Layout>
        <Message message="Loading User Profile..." variant="loading" />
      </Layout>
    );
  }

  if (profileData.error) {
    return (
      <Layout>
        <Typography>
          The User profile you've entered is not in our database. Please try
          again.
        </Typography>
      </Layout>
    );
  }

  const {
    name,
    bio,
    avatar_select,
    gravatar_avatar_url,
    patreon_avatar_url,
  } = profileData;

  const isUserAuthorized = !!user && user.onbc_id === Number(userId);

  return (
    <Layout>
      <SnackbarContext.Provider value={triggerSnackbar}>
        <Grid container space={2}>
          <Grid item container xs={12}>
            <ProfileImage
              name={name}
              gravatar_avatar_url={gravatar_avatar_url}
              patreon_avatar_url={patreon_avatar_url}
              avatar_select={avatar_select}
              isUserAuthorized={isUserAuthorized}
              xs={12}
              md={3}
            />
            <ProfileHeader
              name={name}
              bio={bio}
              xs={12}
              md={9}
              isUserAuthorized={isUserAuthorized}
            />
          </Grid>
          {isUserAuthorized ? (
            <ProfileData xs={12} md={3} />
          ) : (
            <Grid item xs={12} md={3} />
          )}
          <ProfileBookList
            listTitle="Wishlist"
            books={profileData.wishlist}
            xs={12}
            md
          />
          <ProfileBookList
            listTitle="Read List"
            books={profileData.reads}
            xs={12}
            md
          />
        </Grid>
        {renderModal(user?.isPatron)}
        <OnbcSnackbar content={snackBarContent} closeSnackbar={closeSnackbar} />
      </SnackbarContext.Provider>
    </Layout>
  );
};

export default Userview;

export async function getServerSideProps(context) {
  return {
    props: {
      userId: context.params.id,
      showModal: context.query.tutorial === "true",
    },
  };
}
