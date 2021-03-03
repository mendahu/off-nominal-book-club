import { NextApiRequest, NextApiResponse } from "next";
import { fetchAllReadings } from "../../../db/queries/readings";
import { ApiErrorResponse } from "../../../src/types/api/apiTypes";

export const readings = async (
  req: NextApiRequest,
  res: NextApiResponse<any | ApiErrorResponse>
) => {
  try {
    const response = await fetchAllReadings();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default readings;
