import { NextApiResponse } from "next";
import { ApiErrorResponse, BookClubReq } from "../../../src/types/api/apiTypes";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { createReading } from "../../../db/queries/readings";
import { allowMethod } from "../../../src/api/middleware/allowMethod";
import { allowPatron } from "../../../src/api/middleware/allowPatron";

export const newReading = async (
  req: BookClubReq,
  res: NextApiResponse<string | ApiErrorResponse>
) => {
  const { userProfile, body } = req;

  if (!body.bookId) {
    return res.status(400).json({
      error: "Bad request",
      message: "You are missing required body parameters for this request",
    });
  }

  try {
    const response = await createReading(body.bookId, userProfile.onbc_id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default allowMethod(
  withApiAuthRequired(allowPatron((req, res) => newReading(req, res))),
  ["POST"]
);
