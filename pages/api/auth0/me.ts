import { NextApiRequest, NextApiResponse } from 'next';
import userProfileFetcher from '../../../src/helpers/userProfileFetcher';

const me = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userProfile = await userProfileFetcher(req);
    return res.status(200).json(userProfile);
  } catch (error) {
    const { status, message, name } = error;
    return res.status(status).json({
      status,
      name,
      message,
    });
  }
};

export default me;
