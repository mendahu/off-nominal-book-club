const queries = require("../../../db/queries/favs");
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired((req, res) => {
  const { bookId, userId } = req.body;

  return queries.favourites
    .add(bookId, userId)
    .then((results) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(results));
    })
    .catch((err) => {
      console.error(err);
      res.statusCode = 500;
      return res.end(JSON.stringify({ success: false }));
    });
});
