const queries = require('../../../db/queries/users')

export default (req, res) => {
  
  const { name, bio } = req.body

  const userId = 538

  return queries
    .users
    .update(userId, { bio, name })
    .then((results) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json')
      return res.end(JSON.stringify(results))
    })
    .catch(err => {
      console.error(err)
      res.statusCode = 500;
      return res.end(JSON.stringify({"success": false}))
    })
};