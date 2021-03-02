import userProfileFetcher from "../../../src/helpers/userProfileFetcher";
import { NextApiRequest, NextApiResponse } from "next";
import { DisplayUser } from "../../../src/types/common";
import { ApiErrorResponse } from "../../../src/types/api/apiTypes";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import getAuth0USerSub from "../../../src/helpers/auth0/auth0Sub";
import {
  deleteReading,
  validateReadingOwner,
} from "../../../db/queries/readings";

export const delReading = async (
  req: NextApiRequest,
  res: NextApiResponse<string | ApiErrorResponse>
) => {
  // verify Patreon status

  let userProfile: DisplayUser;

  try {
    const sub = await getAuth0USerSub(req, res);
    userProfile = await userProfileFetcher(sub);
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      message: "Something went wrong authenticating your request.",
    });
  }

  if (!userProfile.isPatron) {
    return res.status(403).json({
      error: "Not Authenticated",
      message: "Access restricted to logged in patrons only.",
    });
  }

  const { method, body } = req;

  try {
    const response = await validateReadingOwner(
      body.readingId,
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

  if (method !== "DELETE") {
    return res.status(405).json({
      error: `Method ${method} Not Allowed`,
    });
  }

  if (!body) {
    return res.status(400).json({
      error: "Bad request",
      message: "You are missing required body for this request",
    });
  }

  try {
    const response = await deleteReading(body.readingId);
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

export default withApiAuthRequired((req, res) => delReading(req, res));
