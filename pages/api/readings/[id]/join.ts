import userProfileFetcher from "../../../../src/helpers/userProfileFetcher";
import { NextApiRequest, NextApiResponse } from "next";
import { DisplayUser } from "../../../../src/types/common";
import {
  ApiErrorResponse,
  ApiReadingMember,
} from "../../../../src/types/api/apiTypes";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import getAuth0USerSub from "../../../../src/helpers/auth0/auth0Sub";
import { joinReading } from "../../../../db/queries/readings";

export const delReading = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiReadingMember | ApiErrorResponse>
) => {
  const {
    method,
    query: { id },
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

export default withApiAuthRequired((req, res) => delReading(req, res));
