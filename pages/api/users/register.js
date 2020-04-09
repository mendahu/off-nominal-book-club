const queries = require('../../../db/queries/users')

export default function register(req, res) {
  
  return queries.users.register()
  .then(id => {
    res.statusCode = 200;
    const onbcId = id[0]
    return res.json({ onbcId })
  })
  .catch((err) => {
    console.error("could not insert user into db", err)
  })

};
