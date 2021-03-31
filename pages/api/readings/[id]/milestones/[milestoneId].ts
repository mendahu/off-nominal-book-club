import { NextApiResponse } from "next";
import {
  ApiErrorResponse,
  BookClubReq,
} from "../../../../../src/types/api/apiTypes";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { validateReadingOwner } from "../../../../../db/queries/readings";
import {
  deleteMilestone,
  editMilestone,
} from "../../../../../db/queries/readingsMilestones";
import { allowMethod } from "../../../../../src/api/middleware/allowMethod";
import { allowPatron } from "../../../../../src/api/middleware/allowPatron";

export const newMilestone = async (
  req: BookClubReq,
  res: NextApiResponse<string | ApiErrorResponse>
) => {
  const {
    userProfile,
    query: { id, milestoneId },
    body: { label, date },
  } = req;

  if (!req.body) {
    return res.status(400).json({
      error: "Bad request",
      message: "You are missing required body paramaters for this request",
    });
  }

  //validate reading ownership

  try {
    const response = await validateReadingOwner(
      id as string,
      userProfile.onbc_id
    );
    if (!response) {
      const message: ApiErrorResponse = {
        message: "This reading does not belong to you.",
      };
      return res.status(403).json(message);
    }
  } catch (error) {
    const message: ApiErrorResponse = {
      message: "Error validating ownership of this reading.",
    };
    return res.status(403).json(message);
  }

  try {
    const response = await editMilestone(milestoneId as string, label, date);
    return res.status(200).json(response[0]);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default allowMethod(
  withApiAuthRequired(allowPatron((req, res) => newMilestone(req, res))),
  ["PUT"]
);
