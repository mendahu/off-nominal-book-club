import userProfileFetcher from "../../../../src/helpers/userProfileFetcher";
import { NextApiRequest, NextApiResponse } from "next";
import { DisplayUser } from "../../../../src/types/common";
import { ApiErrorResponse } from "../../../../src/types/api/apiTypes";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import getAuth0USerSub from "../../../../src/helpers/auth0/auth0Sub";
import { leaveReading } from "../../../../db/queries/readings";

export const delReading = async (
  req: NextApiRequest,
  res: NextApiResponse<string | ApiErrorResponse>
) => {
  const {
    method,
    query: { id },
  } = req;

  if (method !== "DELETE") {
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

  try {
    const response = await leaveReading(id as string, userProfile.onbc_id);
    return res.status(200).json(response[0]);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default withApiAuthRequired((req, res) => delReading(req, res));
