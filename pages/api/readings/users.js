const queries = require('../../../db/queries/readings')

export default (req, res) => {
  const { method } = req
  const { readingId, userId } = req.body

  switch(method) {
    case 'POST': 
      console.log(method)
      return queries
      .users
      .addUser(readingId, userId)
      .then((results) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        return res.end(JSON.stringify(JSON.stringify(results)))
      })
      .catch(err => {
        console.error(err)
        res.statusCode = 500;
        return res.end(JSON.stringify({"success": false}))
      })

    case 'PATCH':
      console.log(method)
      return queries
      .users
      .deleteUser(readingId, userId)
      .then((results) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        return res.end(JSON.stringify(JSON.stringify(results)))
      })
      .catch(err => {
        console.error(err)
        res.statusCode = 500;
        return res.end(JSON.stringify({"success": false}))
      })
      default:
        res.setHeader('Allow', ['POST', 'PATCH'])
        res.status(405).end(`Method ${method} Not Allowed`)
  }
}