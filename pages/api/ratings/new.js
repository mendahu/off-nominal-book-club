const queries = require("../../../db/queries/ratings");
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import getAuth0USerSub from "../../../src/helpers/auth0/auth0Sub";
import userProfileFetcher from "../../../src/helpers/userProfileFetcher";

export default withApiAuthRequired(async (req, res) => {
  const sub = getAuth0USerSub(req, res);
  const userProfile = await userProfileFetcher(sub);
  if (!userProfile.isPatron)
    return res.status(403).end(
      JSON.stringify({
        error: "not_authenticated",
        message: "Access restricted to logged in patrons only.",
      })
    );

  const { bookId, userId, rating } = req.body;

  return queries.ratings
    .add(bookId, userId, rating)
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
