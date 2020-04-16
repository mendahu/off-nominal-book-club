import auth0 from '../../../lib/auth0';
import { updatePatreonData } from '../../../src/helpers/auth0User';

export default auth0.requireAuthentication(async function me(req, res) {
  
  const { user: { sub } } = await auth0.getSession(req)
  const newData = req.body.result;

  const result = await updatePatreonData(sub, newData)
  return res.end(JSON.stringify(result))

});