const queries = require('../../../../db/queries/comments')

export default (req, res) => {
  // const { query: { id }} = req
  // const  { comment, userId }  = req.body

  return res.status(403).end(JSON.stringify({"message": "The Readings feature is temporarily disabled."}))

  // return queries
  //   .comments
  //   .add(id, userId, comment)
  //   .then((results) => {
  //     res.statusCode = 200;
  //     res.setHeader('Content-Type', 'application/json')
  //     return res.end(JSON.stringify(JSON.stringify(results)))
  //   })
  //   .catch(err => {
  //     console.error(err)
  //     res.statusCode = 500;
  //     return res.end(JSON.stringify({"success": false}))
  //   })  
}

/*
This feature is temporarily disabled

*/