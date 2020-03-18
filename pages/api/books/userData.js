const queries = require('../../../db/queries/users')

export default (req, res) => {

  const userId = (req.cookies) ? Number(req.cookies.userId) : null
  const bookId = req.query.bookId

  queries
    .users
    .fetch(userId, bookId)
    .then((results) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(results))
    })
    .catch((err) => {
      res.statusCode = 500
      console.error(err)
    })
};