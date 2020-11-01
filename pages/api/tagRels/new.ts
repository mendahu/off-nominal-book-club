const queries = require('../../../db/queries/tagRels');
import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../lib/auth0';
import userProfileFetcher from '../../../src/helpers/userProfileFetcher';
import { DisplayUser } from '../../../src/types/common';

export const newTagRel = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(405).json({
      error: `Method ${method} Not Allowed`,
    });
  }

  let userProfile: DisplayUser;

  try {
    userProfile = await userProfileFetcher(req);
  } catch (err) {
    return res.status(500).json({
      error: 'authentication_error',
      message: 'There was an error authenticating your user profile.',
    });
  }

  if (!userProfile.isPatron) {
    return res.status(403).json({
      error: 'not_authenticated',
      message: 'Access restricted to logged in patrons only.',
    });
  }

  const { userId, tagId, bookId } = req.body;

  let response;

  try {
    response = await queries.tagRels.add(userId, tagId, bookId);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: 'Error adding tag to database.' });
  }
};

export default auth0.requireAuthentication(
  (req: NextApiRequest, res: NextApiResponse) => newTagRel(req, res)
);
