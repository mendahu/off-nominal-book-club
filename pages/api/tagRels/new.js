const queries = require('../../../db/queries/tagRels')

export default (req, res) => {
  
  const { userId, tagId, bookId } = req.body

  return queries
    .tagRels
    .add(userId, tagId, bookId)
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