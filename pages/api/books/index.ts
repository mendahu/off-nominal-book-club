import { NextApiRequest, NextApiResponse } from 'next';
import { getAllBooks } from '../../../db/queries/books';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await getAllBooks();
    return await res.status(200).json(response.rows);
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
