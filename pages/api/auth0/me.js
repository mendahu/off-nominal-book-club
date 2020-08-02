import userProfileFetcher from '../../../src/helpers/userProfileFetcher';

const me = async (req, res) => {
  try {
    const userProfile = await userProfileFetcher(req);
    return res.end(JSON.stringify(userProfile));
  } catch (error) {
    const { status, message, name } = error;
    return res.status(status).end(
      JSON.stringify({
        status,
        name,
        message,
      })
    );
  }
};

export default me;
