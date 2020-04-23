const queries = require('../../../db/queries/users')
import auth from 'basic-auth'
import compare from 'tsscmp'

export default function register(req, res) {

  const credentials = auth(req)
  console.log(credentials)

  function check (name, pass) {
    let valid = true
   
    // Simple method to prevent short-circut and use timing-safe compare
    valid = compare(name, process.env.AUTH0_REGISTER_USER) && valid
    valid = compare(pass, process.env.AUTH0_REGISTER_PASS) && valid
   
    return valid
  }

  if (!credentials || !check(credentials.name, credentials.pass)) {
    return res.status(401).end('Access denied')
  } else {
    return queries.users.register()
    .then(id => {
      res.statusCode = 200;
      const onbcId = id[0]
      return res.json({ onbcId })
    })
    .catch((err) => {
      console.error("could not insert user into db", err)
    })
  }
  

};
