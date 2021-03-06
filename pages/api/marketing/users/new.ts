import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import getAuth0USerSub from "../../../../src/helpers/auth0/auth0Sub";
import { getAuth0User } from "../../../../src/helpers/auth0/auth0User";
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

export const newMarketingUser = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { method } = req;

  if (method !== "POST") {
    return res.status(405).json({
      error: `Method ${method} Not Allowed`,
    });
  }

  let sub: string;

  try {
    sub = await getAuth0USerSub(req, res);
  } catch (err) {
    return res.status(500).json({ error: "Failed to retrieve Auth0 Session" });
  }

  let email_address: string;

  try {
    const response = await getAuth0User(sub);
    email_address = response.email;
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to retrieve Auth0 User Session" });
  }

  const listId = process.env.MAILCHIMP_AUDIENCE_ID;

  try {
    await mailchimp.lists.addListMember(listId, {
      email_address,
      status: "subscribed",
      tags: ["Book Club"],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error:
        "Failed to subscribe user to marketing list. Third party API returned error.",
    });
  }

  return res
    .status(200)
    .json({ message: "Email preferences updated. User is now subscribed." });
};

export default withApiAuthRequired((req, res) => newMarketingUser(req, res));
