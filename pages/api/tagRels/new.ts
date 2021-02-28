const queries = require("../../../db/queries/tagRels");
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import getAuth0USerSub from "../../../src/helpers/auth0/auth0Sub";
import userProfileFetcher from "../../../src/helpers/userProfileFetcher";
import { DisplayUser } from "../../../src/types/common";

export const newTagRel = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== "POST") {
    return res.status(405).json({
      error: `Method ${method} Not Allowed`,
    });
  }

  const { userId, tagId, bookId } = req.body;

  if (!userId || !tagId || !bookId) {
    return res.status(400).json({
      error: "missing_body_paramaters",
      message:
        "One or more of the required body parameters for this endpoint is missing.",
    });
  }

  let userProfile: DisplayUser;

  try {
    const sub = await getAuth0USerSub(req, res);
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

  try {
    response = await queries.tagRels.add(userId, tagId, bookId);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: "Error adding tag to database." });
  }
};

export default withApiAuthRequired(
  (req: NextApiRequest, res: NextApiResponse) => newTagRel(req, res)
);
