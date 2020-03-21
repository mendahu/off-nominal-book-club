const queries = require('../../../db/queries/users')

export default (req, res) => {
  const {
    query: { id }
  } = req


  queries.users.getUserData(id).then((results) => {
    res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(results))
  })
}