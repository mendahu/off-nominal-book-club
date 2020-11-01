import { NextApiRequest, NextApiResponse } from 'next';
import { add, getTagIdByName } from '../../../db/queries/tags';
import auth0 from '../../../lib/auth0';
import userProfileFetcher from '../../../src/helpers/userProfileFetcher';
import { DisplayUser } from '../../../src/types/common';

export const newTag = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(405).json({
      error: `Method ${method} Not Allowed`,
    });
  }

  const { tagName } = req.body;

  if (!tagName || typeof tagName !== 'string') {
    return res.status(400).json({
      error: 'missing_body_paramaters',
      message:
        'This endpoint requires a tag name in the body parameters. It is either missing or not a string.',
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

  let response;
  const lowerCaseTagName = tagName.toLowerCase();

  try {
    response = await getTagIdByName(lowerCaseTagName);
    if (response.length) {
      return res.status(200).json(response[0]);
    }
    response = await add(lowerCaseTagName);
    return res.status(200).json({ id: response[0] });
  } catch (err) {
    return res.status(500).json({ message: 'Error adding tag to database.' });
  }
};

export default auth0.requireAuthentication(
  (req: NextApiRequest, res: NextApiResponse) => newTag(req, res)
);
