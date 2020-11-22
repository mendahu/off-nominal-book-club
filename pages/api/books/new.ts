import { addBook, confirmBook } from '../../../db/queries/books';
import auth0 from '../../../lib/auth0';
import userProfileFetcher from '../../../src/helpers/userProfileFetcher';
import { NextApiRequest, NextApiResponse } from 'next';
import { DisplayUser } from '../../../src/types/common';
import { ApiErrorResponse } from '../../../src/types/apiTypes';

export const newBook = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiErrorResponse>
) => {
  // verify Patreon status

  let userProfile: DisplayUser;

  try {
    userProfile = await userProfileFetcher(req);
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
      message: 'Something went wrong authenticating your request.',
    });
  }

  if (!userProfile.isPatron) {
    return res.status(403).json({
      error: 'Not Authenticated',
      message: 'Access restricted to logged in patrons only.',
    });
  }

  const { method } = req;
  let bookObj = {};

  switch (method) {
    case 'GET':
      if (!req.query) {
        return res.status(400).json({
          error: 'Bad request',
          message:
            'You are missing required query string parameters for this request',
        });
      }

      const { query } = req;

      bookObj = {
        google_id: query.googleid || null,
        isbn13: query.isbn13 || null,
        title: query.title || null,
      };

      try {
        const response = await confirmBook(bookObj);
        return res.status(200).json(response);
      } catch (error) {
        return res.status(500).json(error);
      }

    case 'POST':
      if (!req.body) {
        return res.status(400).json({
          error: 'Bad request',
          message: 'You are missing required body for this request',
        });
      }

      bookObj = req.body;

      try {
        const response = await addBook(bookObj);
        return res.status(200).json(response);
      } catch (error) {
        return res.status(500).json(error);
      }

    default:
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
};

export default auth0.requireAuthentication((req, res) => newBook(req, res));
