import auth0 from '../../../lib/auth0';
import { users } from '../../../db/queries/users';
import { getAuth0User } from '../../../src/helpers/auth0/auth0User';

export const update = async (req, res) => {
  const {
    user: { sub },
  } = await auth0.getSession(req);

  const {
    app_metadata: { onbc_id },
  } = await getAuth0User(sub);

  return users
    .update(onbc_id, req.body)
    .then(() => {
      return res.status(200).json({ message: 'user entry update successful' });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

export default auth0.requireAuthentication((req, res) => {
  return update(req, res);
});
