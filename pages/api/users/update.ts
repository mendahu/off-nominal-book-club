import auth0 from '../../../lib/auth0';
import { updateUser } from '../../../db/queries/users';
import { getAuth0User } from '../../../src/helpers/auth0/auth0User';
import { NextApiRequest, NextApiResponse } from 'next';

export const update = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== 'PATCH') {
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

  let onbc_id: string;

  try {
    const response = await getAuth0User(sub);
    onbc_id = response.app_metadata.onbc_id;
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Failed to retrieve Auth0 User Session' });
  }

  return updateUser(onbc_id, req.body)
    .then(() => {
      return res.status(200).json({ message: 'user entry update successful' });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

export default auth0.requireAuthentication((req, res) => update(req, res));