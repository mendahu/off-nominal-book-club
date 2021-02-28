import { NextApiRequest, NextApiResponse } from "next";
import { getAuth0User } from "../../../../src/helpers/auth0/auth0User";
import { MailchimpSubscriberStatus } from "../../../../src/types/api/apiTypes.d";
const mailchimp = require("@mailchimp/mailchimp_marketing");
import md5 from "md5";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

export const updateMarketingUser = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { method, body } = req;

  if (method !== "PATCH") {
    return res.status(405).json({
      error: `Method ${method} Not Allowed`,
    });
  }

  if (!body) {
    return res.status(400).json({
      error: `Query is missing body which is required.`,
    });
  }

  const { subscriberStatus, newStatus } = body;

  if (!subscriberStatus || !newStatus) {
    return res.status(400).json({
      error: `Query is missing body parameters which are required.`,
    });
  }

  let sub: string;

  try {
    const { user } = await getSession(req, res);
    sub = user.sub;
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

  if (typeof email_address !== "string") {
    return res.status(422).json({
      error:
        "Email address returned from Auth0 invalid, unable to update marketing preferences.",
    });
  }

  const subscriberHash = md5(email_address);
  const listId = process.env.MAILCHIMP_AUDIENCE_ID;

  try {
    await mailchimp.lists.setListMember(listId, subscriberHash, {
      email_address,
      status_if_new: newStatus,
      status: newStatus,
    });
    if (newStatus === MailchimpSubscriberStatus.subscribed) {
      await mailchimp.lists.updateListMemberTags(listId, subscriberHash, {
        body: {
          tags: [
            {
              name: "Book Club",
              status: "active",
            },
          ],
        },
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error:
        "Failed to subscribe user to marketing list. Third party API returned error.",
    });
  }

  return res.status(200).json({
    message: `Email preferences updated successfully. New status is ${newStatus}`,
  });
};

export default withApiAuthRequired((req, res) => updateMarketingUser(req, res));
