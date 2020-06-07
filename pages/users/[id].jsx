import { useState, useEffect } from 'react';
import {
  ProfileImage,
  ProfileHeader,
  ProfileData,
  ProfileWishList,
  ProfileReadList,
} from '../../src/components/Userview';
import Layout from '../../src/components/DefaultLayout';
import { Typography, Grid, Box } from '@material-ui/core';
import { useFetchUser } from '../../lib/user';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const Userview = ({ userId }) => {
  const { user, loading } = useFetchUser();

  const [profileData, setProfileData] = useState({
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/users/${userId}`);
        setProfileData({
          ...data,
          loading: false,
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

  if (profileData.loading) {
    return (
      <Layout>
        <Typography>Loading...</Typography>
      </Layout>
    );
  }

  if (!profileData.name) {
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

  const isGravatar = avatar_select === 'gravatar';
  const newAvatarSelect = isGravatar ? 'patreon' : 'gravatar';

  const handleAvatarToggle = async () => {
    setProfileData({ ...profileData, avatar_select: newAvatarSelect });
    await axios.patch('/api/users/update', { avatar_select: newAvatarSelect });
  };

  return (
    <Layout>
      <Grid container space={2}>
        <Grid item container xs={12}>
          <ProfileImage
            name={name}
            avatar={isGravatar ? gravatar_avatar_url : patreon_avatar_url}
            newAvatarSelect={newAvatarSelect}
            loggedIn={!!user}
            onClick={handleAvatarToggle}
            xs={12}
            md={3}
          />
          <ProfileHeader name={name} bio={bio} xs={12} md={9} />
        </Grid>
        <ProfileData xs={12} md={3} />
        <ProfileWishList books={profileData.wishlist} xs={12} md />
        <ProfileReadList books={profileData.reads} xs={12} md />
      </Grid>
    </Layout>
  );
};

export default Userview;

export async function getServerSideProps(context) {
  return { props: { userId: context.params.id } };
}
