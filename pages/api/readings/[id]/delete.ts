import { NextApiResponse } from "next";
import {
  ApiErrorResponse,
  BookClubReq,
} from "../../../../src/types/api/apiTypes";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import {
  deleteReading,
  validateReadingOwner,
} from "../../../../db/queries/readings";
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
    const response = await deleteReading(id as string);
    const message: ApiErrorResponse = {
      message: response
        ? "Reading successfully deleted."
        : "No reading found with that id.",
    };
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default allowMethod(
  withApiAuthRequired(allowPatron((req, res) => delReading(req, res))),
  ["DELETE"]
);
