import { useState, useEffect } from 'react';
import {
  ProfileImage,
  ProfileHeader,
  ProfileData,
  ProfileBookList,
} from '../../src/components/Userview';
import Layout from '../../src/components/DefaultLayout';
import Message from '../../src/components/Utility/Message';
import { Typography, Grid } from '@material-ui/core';
import { useFetchUser } from '../../lib/user';
import axios from 'axios';
import { useSnackbar, OnbcSnackbar } from '../../src/hooks/useSnackbar';

const Userview = ({ userId }) => {
  const { user, loading } = useFetchUser();
  const { snackBarContent, triggerSnackbar, closeSnackbar } = useSnackbar();
  const [profileData, setProfileData] = useState({
    loading: true,
    error: true,
  });

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
      <Grid container space={2}>
        <Grid item container xs={12}>
          <ProfileImage
            name={name}
            gravatar_avatar_url={gravatar_avatar_url}
            patreon_avatar_url={patreon_avatar_url}
            avatar_select={avatar_select}
            isPatron={user?.isPatron}
            isUserAuthorized={isUserAuthorized}
            xs={12}
            md={3}
            triggerSnackbar={triggerSnackbar}
          />
          <ProfileHeader
            name={name}
            bio={bio}
            xs={12}
            md={9}
            isUserAuthorized={isUserAuthorized}
            triggerSnackbar={triggerSnackbar}
          />
        </Grid>
        {isUserAuthorized ? (
          <ProfileData
            xs={12}
            md={3}
            patreonState={user?.patreon?.state}
            email={user?.email}
            getsMail={profileData?.getsMail}
            triggerSnackbar={triggerSnackbar}
          />
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
      <OnbcSnackbar content={snackBarContent} closeSnackbar={closeSnackbar} />
    </Layout>
  );
};

export default Userview;

export async function getServerSideProps(context) {
  return { props: { userId: context.params.id } };
}
