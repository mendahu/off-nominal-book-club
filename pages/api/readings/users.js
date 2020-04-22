//const queries = require('../../../db/queries/readings')

export default (req, res) => {
  // const { method } = req
  // const { readingId, userId } = req.body

  return res.status(403).end(JSON.stringify({"message": "The Readings feature is temporarily disabled."}))

  // switch(method) {
  //   case 'POST': 
  //     return queries
  //     .users
  //     .addUser(readingId, userId)
  //     .then((results) => {
  //       res.statusCode = 200;
  //       res.setHeader('Content-Type', 'application/json')
  //       return res.end(JSON.stringify(JSON.stringify(results)))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //       res.statusCode = 500;
  //       return res.end(JSON.stringify({"success": false}))
  //     })

  //   case 'PATCH':
  //     return queries
  //     .users
  //     .deleteUser(readingId, userId)
  //     .then((results) => {
  //       res.statusCode = 200;
  //       res.setHeader('Content-Type', 'application/json')
  //       return res.end(JSON.stringify(JSON.stringify(results)))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //       res.statusCode = 500;
  //       return res.end(JSON.stringify({"success": false}))
  //     })
  //     default:
  //       res.setHeader('Allow', ['POST', 'PATCH'])
  //       res.status(405).end(`Method ${method} Not Allowed`)
  // }
}

/*
This feature is temporarily disabled

*/