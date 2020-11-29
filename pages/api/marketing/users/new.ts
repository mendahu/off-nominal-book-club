import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../../lib/auth0';
import { getAuth0User } from '../../../../src/helpers/auth0/auth0User';
import { MailchimpSubscriberStatus } from '../../../../src/types/api/apiTypes';
const mailchimp = require('@mailchimp/mailchimp_marketing');
var md5 = require('md5');

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

export const newMarketingUser = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(405).json({
      error: `Method ${method} Not Allowed`,
    });
  }

  let sub: string;

  try {
    const { user } = await auth0.getSession(req);
    sub = user.sub;
  } catch (err) {
    return res.status(500).json({ error: 'Failed to retrieve Auth0 Session' });
  }

  let email_address: string;

  try {
    const response = await getAuth0User(sub);
    email_address = response.email_address;
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Failed to retrieve Auth0 User Session' });
  }

  // Request to Mailchimp to subscribe
  if (req.body.gets_mail !== undefined && email_address) {
    const subscriberHash = md5(email_address);
    const listId = process.env.MAILCHIMP_AUDIENCE_ID;

    const getListStatus = async (
      listId: string,
      hashedEmail: string
    ): Promise<MailchimpSubscriberStatus> => {
      let status: MailchimpSubscriberStatus;

      try {
        const response = await mailchimp.lists.getListMember(
          listId,
          hashedEmail
        );
        status = response.status;
      } catch (err) {
        if (err.status === 404) {
          status = MailchimpSubscriberStatus.notSubscribed;
        } else {
          throw 'Error';
        }
      }

      return status;
    };

    let status: MailchimpSubscriberStatus;

    try {
      status = await getListStatus(listId, subscriberHash);
      console.log(status);
    } catch (err) {
      return res.status(500).json({
        error:
          'Failed to subscribe user to marketing list. Third party API returned error.',
      });
    }

    try {
      const response = await mailchimp.lists.setListMember(listId, {
        email_address,
        status: 'subscribed',
        tags: ['Book Club'],
      });
      console.log(response);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error:
          'Failed to subscribe user to marketing list. Third party API returned error.',
      });
    }
  }
};

export default auth0.requireAuthentication((req, res) =>
  newMarketingUser(req, res)
);
