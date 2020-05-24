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

const useStyles = makeStyles((theme) => ({
  //
}));

const Userview = ({ userId }) => {
  const classes = useStyles();
  const { user, loading } = useFetchUser();

  const [profileData, setProfileData] = useState({
    user: null,
    books: null,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/users/${userId}`);
        setProfileData({
          user: data.user,
          books: data.books,
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

  if (!profileData.user) {
    return (
      <Layout>
        <Typography>
          The User profile you've entered is not in our database. Please try
          again.
        </Typography>
      </Layout>
    );
  }

  const { books } = profileData;

  return (
    <Layout>
      <Grid container space={2}>
        <ProfileImage user={profileData.user[0]} xs={12} md={3} />
        <ProfileHeader user={profileData.user[0]} xs={12} md={9} />
        <ProfileData xs={12} md={3} />
        <ProfileWishList books={books.wishlist} xs={12} md />
        <ProfileReadList books={books.reads} xs={12} md />
      </Grid>
    </Layout>
  );
};

export default Userview;

export async function getServerSideProps(context) {
  return { props: { userId: context.params.id } };
}
