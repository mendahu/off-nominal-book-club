//const queries = require('../../../db/queries/readings')

export default (req, res) => {
  // const {
  //   query: {id}
  // } = req


  return res.status(403).end(JSON.stringify({"message": "The Readings feature is temporarily disabled."}))


  // return queries.readings.fetch(id).then((results) => {
  //   res.statusCode = 200;
  //   res.setHeader('Content-Type', 'application/json')
  //   return res.end(JSON.stringify(results))
  // })
}

/*
This feature is temporarily disabled

*/