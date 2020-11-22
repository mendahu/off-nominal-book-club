import { NextApiRequest, NextApiResponse } from 'next';
import { getAllTags } from '../../../db/queries/tags';
import { ApiTag } from '../../../src/types/api/apiTypes';

export const tags = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiTag[] | { message: string }>
) => {
  const { method } = req;

  if (method !== 'GET') {
    return res.status(405).json({
      message: `Method ${method} Not Allowed`,
    });
  }

  try {
    const response = await getAllTags();
    return res.status(200).json(response.rows);
  } catch (err) {
    return res.status(500).json({
      message: 'Error reading database.',
    });
  }
};

export default tags;
