const queries = require('../../../../db/queries/comments')

export default (req, res) => {


  const { query: { id }} = req
  const  { comment, userId }  = req.body

  
  return queries
    .comments
    .add(id, userId, comment)
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

  
}