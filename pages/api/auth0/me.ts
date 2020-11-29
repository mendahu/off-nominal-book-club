import { NextApiRequest, NextApiResponse } from 'next';
import userProfileFetcher from '../../../src/helpers/userProfileFetcher';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== 'GET') {
    return res.status(405).json({
      error: `Method ${method} Not Allowed`,
    });
  }

  try {
    const userProfile = await userProfileFetcher(req);
    return res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Failed to fetch user profile',
    });
  }
};
