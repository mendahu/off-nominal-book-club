const { users } = require('../../../db/queries/users');

export default (req, res) => {
  const {
    query: { id },
  } = req;

  return users
    .getUserData(id)
    .then((results) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify(results));
    })
    .catch((err) => {
      res.statusCode = 404;
      return res.end(JSON.stringify({ status: res.statusCode, error: err }));
    });
};
