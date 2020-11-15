import { NextApiRequest, NextApiResponse } from 'next';
import { getAllBooks } from '../../../db/queries/books';
import { Book } from '../../../src/types/apiTypes';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Book[] | { message: string }>
) => {
  try {
    const response = await getAllBooks();
    return await res.status(200).json(response.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
