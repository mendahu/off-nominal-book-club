const queries = require('../../../db/queries/users');
import auth from 'basic-auth';
import compare from 'tsscmp';

export default function register(req, res) {
  const credentials = auth(req);

  function check(name, pass) {
    let valid = true;

    // Simple method to prevent short-circut and use timing-safe compare
    valid = compare(name, process.env.AUTH0_REGISTER_USER) && valid;
    valid = compare(pass, process.env.AUTH0_REGISTER_PASS) && valid;

    return valid;
  }

  if (!credentials || !check(credentials.name, credentials.pass)) {
    return res.status(401).json({ message: 'Access denied' });
  } else {
    return queries.users
      .register()
      .then((onbcIdArray) => res.status(200).json({ onbcId: onbcIdArray[0] }))
      .catch((error) => res.status(500).json({ error }));
  }
}
