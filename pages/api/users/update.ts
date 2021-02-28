import { updateUser } from "../../../db/queries/users";
import { getAuth0User } from "../../../src/helpers/auth0/auth0User";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export const update = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  if (method !== "PATCH") {
    return res.status(405).json({
      error: `Method ${method} Not Allowed`,
    });
  }

  if (!body) {
    return res.status(400).json({
      error: `Query is missing body which is required.`,
    });
  }

  let sub: string;

  try {
    const { user } = await getSession(req, res);
    sub = user.sub;
  } catch (err) {
    return res.status(500).json({ error: "Failed to retrieve Auth0 Session" });
  }

  let onbc_id: string;

  try {
    const response = await getAuth0User(sub);
    onbc_id = response.app_metadata.onbc_id;
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to retrieve Auth0 User Session" });
  }

  return updateUser(onbc_id, body)
    .then(() => {
      return res.status(200).json({ message: "user entry update successful" });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

export default withApiAuthRequired((req, res) => update(req, res));
