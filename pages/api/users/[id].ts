const { getUserData } = require('../../../db/queries/users');

export default (req, res) => {
  const {
    query: { id },
  } = req;

  return getUserData(id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(404).json({ status: 404, error: err }));
};
