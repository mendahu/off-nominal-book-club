
const queries = require('../../db/queries')

const handler = (req, res) => {
  queries
  .users
  .getAll()
  .then(users => {
    res.json(users)
  })
};

export default handler 
