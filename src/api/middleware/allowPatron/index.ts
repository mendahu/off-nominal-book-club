import { NextApiResponse } from "next";
import getAuth0USerSub from "../../../helpers/auth0/auth0Sub";
import userProfileFetcher from "../../../helpers/userProfileFetcher";
import { BookClubReq } from "../../../types/api/apiTypes";
import { DisplayUser } from "../../../types/common";

export const allowPatron = (
  handler: (req: BookClubReq, res: NextApiResponse) => void
) => {
  return async (req, res) => {
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
    } else {
      req.userProfile = userProfile;
      return handler(req, res);
    }
  };
};
