import { NextApiRequest, NextApiResponse } from "next";
import { updatePatreonData } from "../../../src/helpers/auth0/auth0User";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import getAuth0USerSub from "../../../src/helpers/auth0/auth0Sub";

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const sub = await getAuth0USerSub(req, res);
    const newData = req.body.result;

    const result = await updatePatreonData(sub, newData);
    return res.end(JSON.stringify(result));
  }
);
