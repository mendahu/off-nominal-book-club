import { NextApiRequest, NextApiResponse } from 'next';
import { getAllTags, SortBy } from '../../../db/queries/tags';
import { ApiTag } from '../../../src/types/api/apiTypes';

export const tags = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiTag[] | { message: string }>
) => {
  const { method, query } = req;

  if (method !== 'GET') {
    return res.status(405).json({
      message: `Method ${method} Not Allowed`,
    });
  }

  const { sort } = query;
  let sortBy: SortBy;

  if (Array.isArray(sort)) {
    return res.status(400).json({
      message: `Query strings as arrays are not supported.`,
    });
  }

  if (sort !== SortBy.count && sort !== SortBy.label && sort !== undefined) {
    return res.status(400).json({
      message: `Query string value for sort (${sort}) is not supported.`,
    });
  }

  if (sort === undefined) {
    sortBy = SortBy.label;
  } else {
    sortBy = sort as SortBy;
  }

  try {
    const response = await getAllTags(sortBy);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      message: 'Error reading database.',
    });
  }
};

export default tags;
