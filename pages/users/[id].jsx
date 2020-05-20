import { useState, useEffect } from 'react';
import ProfileBanner from '../../src/components/Userview/ProfileBanner';
import TabPanel from '../../src/components/General/TabPanel';
import Layout from '../../src/components/DefaultLayout';
import { Typography } from '@material-ui/core';
import { useFetchUser } from '../../lib/user';
import axios from 'axios';

const Userview = ({ userId }) => {
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
      <Typography>Hello {profileData.user[0].name}</Typography>
    </Layout>
  );
};

export default Userview;

export async function getServerSideProps(context) {
  return { props: { userId: context.params.id } };
}
