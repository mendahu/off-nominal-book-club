const queries = require('../../../db/queries/users')

export default (req, res) => {
  const { method, body } = req
  
  if (method === "POST") {
    queries.users.authenticate(body.email, body.password)
      .then((auth) => {
        res.statusCode = 200;
        console.log("User Logged In Status:", auth)
        res.send("post request complete")
      })
      .catch((err) => {
        console.error("query to db faile at API endpoint")
      })
  }

};
