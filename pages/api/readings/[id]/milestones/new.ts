import userProfileFetcher from "../../../../../src/helpers/userProfileFetcher";
import { NextApiRequest, NextApiResponse } from "next";
import { DisplayUser } from "../../../../../src/types/common";
import { ApiErrorResponse } from "../../../../../src/types/api/apiTypes";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import getAuth0USerSub from "../../../../../src/helpers/auth0/auth0Sub";
import { validateReadingOwner } from "../../../../../db/queries/readings";
import { addMilestone } from "../../../../../db/queries/readingsMilestones";

export const newMilestone = async (
  req: NextApiRequest,
  res: NextApiResponse<string | ApiErrorResponse>
) => {
  const {
    method,
    query: { id },
    body: { label, date },
  } = req;

  if (method !== "POST") {
    return res.status(405).json({
      error: `Method ${method} Not Allowed`,
    });
  }

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

  if (!req.body || !label || !date) {
    return res.status(400).json({
      error: "Bad request",
      message: "You are missing required body paramaters for this request",
    });
  }

  try {
    const response = await addMilestone(label, date, id as string);
    return res.status(200).json(response[0]);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default withApiAuthRequired((req, res) => newMilestone(req, res));
