import { withApiAuthRequired } from "@auth0/nextjs-auth0";
const queries = require("../../../../db/queries/favs");

export default withApiAuthRequired((req, res) => {
  const {
    query: { id },
  } = req;

  return queries.favourites
    .delete(id)
    .then(() => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ success: true }));
    })
    .catch((err) => {
      console.error(err);
      res.statusCode = 500;
      return res.end(JSON.stringify({ success: false }));
    });
});
