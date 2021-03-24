import { NextApiResponse } from "next";
import {
  ApiErrorResponse,
  BookClubReq,
} from "../../../../src/types/api/apiTypes";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { leaveReading } from "../../../../db/queries/readings";
import { allowMethod } from "../../../../src/api/middleware/allowMethod";
import { allowPatron } from "../../../../src/api/middleware/allowPatron";

export const delReading = async (
  req: BookClubReq,
  res: NextApiResponse<string | ApiErrorResponse>
) => {
  const {
    userProfile,
    query: { id },
  } = req;

  try {
    const response = await leaveReading(id as string, userProfile.onbc_id);
    return res.status(200).json(response[0]);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default allowMethod(
  withApiAuthRequired(allowPatron((req, res) => delReading(req, res))),
  ["DELETE"]
);
