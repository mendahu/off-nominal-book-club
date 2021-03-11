import { NextApiRequest, NextApiResponse } from "next";
import { ApiErrorResponse } from "../../../../src/types/api/apiTypes";
import { fetchReading } from "../../../../db/queries/readings/index";

export const getReading = async (
  req: NextApiRequest,
  res: NextApiResponse<string | ApiErrorResponse>
) => {
  const {
    query: { id },
    method,
  } = req;

  if (method !== "GET") {
    return res.status(405).json({
      error: `Method ${method} Not Allowed`,
    });
  }

  try {
    const response = await fetchReading(id as string);
    if (!response.rows.length) {
      throw "No Reading Found with that Id.";
    }
    return res.status(200).json(response.rows[0]);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default getReading;
