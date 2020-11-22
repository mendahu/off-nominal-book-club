import { NextApiRequest, NextApiResponse } from 'next';
import { getAllBooks } from '../../../db/queries/books';
import { ApiBook, ApiErrorResponse } from '../../../src/types/api/apiTypes';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiBook[] | ApiErrorResponse>
) => {
  const { method } = req;

  if (method !== 'GET') {
    return res.status(405).json({
      error: `Method ${method} Not Allowed`,
    });
  }

  try {
    const response = await getAllBooks();
    return res.status(200).json(response.rows);
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
