import { NextApiRequest, NextApiResponse } from 'next';
import { getAllTags } from '../../db/queries/tags';
import { AutocompleteTag } from '../../src/types/apiTypes';

export const tags = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== 'GET') {
    return res.status(405).json({
      error: `Method ${method} Not Allowed`,
    });
  }

  try {
    const response = await getAllTags();
    return res.status(200).json(response.rows as AutocompleteTag[]);
  } catch (err) {
    return res.status(500).json({
      message: 'Error reading database.',
    });
  }
};

export default tags;
