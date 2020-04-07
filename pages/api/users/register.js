const queries = require('../../../db/queries/users')

export default function register(req, res) {
  //const { body } = req
  
  return queries.users.register()
  .then((id) => {
    res.statusCode = 200;
    return res.json(id)
  })
  .catch((err) => {
    console.error("could not insert user into db", err)
  })

};
