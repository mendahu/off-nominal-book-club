import { NextApiResponse } from "next";
import {
  ApiErrorResponse,
  ApiReadingMember,
  BookClubReq,
} from "../../../../src/types/api/apiTypes";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { joinReading } from "../../../../db/queries/readings";
import { allowMethod } from "../../../../src/api/middleware/allowMethod";
import { allowPatron } from "../../../../src/api/middleware/allowPatron";

export const delReading = async (
  req: BookClubReq,
  res: NextApiResponse<ApiReadingMember | ApiErrorResponse>
) => {
  const {
    userProfile,
    query: { id },
  } = req;

  try {
    const response = await joinReading(id as string, userProfile.onbc_id);
    const joinPayload: ApiReadingMember = {
      id: response[0],
      name: userProfile.name,
      avatar: userProfile.avatar,
    };
    return res.status(200).json(joinPayload);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default allowMethod(
  withApiAuthRequired(allowPatron((req, res) => delReading(req, res))),
  ["POST"]
);
