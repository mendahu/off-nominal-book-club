import { NextApiRequest, NextApiResponse } from "next";
import { ApiErrorResponse } from "../../../../src/types/api/apiTypes";
import { fetchReading } from "../../../../db/queries/readings/index";
import { allowMethod } from "../../../../src/api/middleware/allowMethod";

export const getReading = async (
  req: NextApiRequest,
  res: NextApiResponse<string | ApiErrorResponse>
) => {
  const { id } = req.query;

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

export default allowMethod(getReading, ["GET"]);
