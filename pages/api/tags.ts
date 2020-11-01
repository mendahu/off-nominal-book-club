import { NextApiRequest, NextApiResponse } from 'next';
import { getAllTags } from '../../db/queries/tags';
import { AutocompleteTag } from '../../src/types/apiTypes';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await getAllTags();
    res.status(200).json(response.rows as AutocompleteTag[]);
  } catch (err) {
    res.status(500).json({
      message: 'Error reading database.',
    });
  }
};
