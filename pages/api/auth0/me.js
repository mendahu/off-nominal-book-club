import userProfileFetcher from '../../../src/helpers/userProfileFetcher';

const me = async (req, res) => {
  try {
    const userProfile = await userProfileFetcher(req);
    return res.end(JSON.stringify(userProfile));
  } catch (error) {
    console.error('Error at /me:', error);
    res.status(error.status).end();
    throw error;
  }
};

export default me;
