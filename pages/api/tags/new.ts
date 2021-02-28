import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { addTag, getTagIdByName } from "../../../db/queries/tags";
import userProfileFetcher from "../../../src/helpers/userProfileFetcher";
import { DisplayUser } from "../../../src/types/common";

export const newTag = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== "POST") {
    return res.status(405).json({
      error: `Method ${method} Not Allowed`,
    });
  }

  const { tagName } = req.body;

  if (!tagName || typeof tagName !== "string") {
    return res.status(400).json({
      error: "missing_body_paramaters",
      message:
        "This endpoint requires a tag name in the body parameters. It is either missing or not a string.",
    });
  }

  let userProfile: DisplayUser;

  try {
    const session = await getSession(req, res);
    const {
      user: { sub },
    } = await session;
    userProfile = await userProfileFetcher(sub);
  } catch (err) {
    return res.status(500).json({
      error: "authentication_error",
      message: "There was an error authenticating your user profile.",
    });
  }

  if (!userProfile.isPatron) {
    return res.status(403).json({
      error: "not_authenticated",
      message: "Access restricted to logged in patrons only.",
    });
  }

  let response;
  const lowerCaseTagName = tagName.toLowerCase();

  try {
    response = await getTagIdByName(lowerCaseTagName);
    if (response.length) {
      return res.status(200).json(response[0]);
    }
    response = await addTag(lowerCaseTagName);
    return res.status(200).json({ id: response[0] });
  } catch (err) {
    return res.status(500).json({ message: "Error adding tag to database." });
  }
};

export default withApiAuthRequired(
  (req: NextApiRequest, res: NextApiResponse) => newTag(req, res)
);
