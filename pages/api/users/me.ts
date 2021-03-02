import { NextApiRequest, NextApiResponse } from "next";
import getAuth0USerSub from "../../../src/helpers/auth0/auth0Sub";
import userProfileFetcher from "../../../src/helpers/userProfileFetcher";
import { DisplayUser } from "../../../src/types/common";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let userProfile: DisplayUser;
  try {
    const sub = await getAuth0USerSub(req, res);
    userProfile = await userProfileFetcher(sub);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }

  return res.status(200).json(userProfile);
};
