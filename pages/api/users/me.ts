import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import userProfileFetcher from "../../../src/helpers/userProfileFetcher";
import { DisplayUser } from "../../../src/types/common";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let userProfile: DisplayUser;
  try {
    const session = await getSession(req, res);
    const {
      user: { sub },
    } = await session;
    userProfile = await userProfileFetcher(sub);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }

  return res.status(200).json(userProfile);
};
