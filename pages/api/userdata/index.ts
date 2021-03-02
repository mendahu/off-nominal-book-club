import { NextApiRequest, NextApiResponse } from "next";
import { getUserData } from "../../../db/queries/userdata";
import {
  ApiUserMetadata,
  ApiErrorResponse,
} from "../../../src/types/api/apiTypes";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export const userdata = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiUserMetadata | ApiErrorResponse>
) => {
  const { method } = req;

  if (method !== "GET") {
    return res.status(405).json({
      error: `Method ${method} Not Allowed`,
    });
  }

  const {
    query: { bookId, userId },
  } = req;

  if (
    (typeof bookId !== "string" && typeof bookId !== "undefined") ||
    typeof userId !== "string"
  ) {
    return res.status(400).json({
      error: `Invalid query string. 'userId' should be a string.`,
    });
  }

  try {
    const response = await getUserData(userId, bookId);

    const metaData: ApiUserMetadata = {};

    response.forEach((datum) => {
      metaData[datum.book_id] = {
        reads: datum.reads_id,
        favourites: datum.favourites_id,
        wishlist: datum.wishlist_id,
      };
    });

    return res.status(200).json(metaData);
  } catch (err) {
    return res.status(500).json({
      error: "Could not fetch data from database.",
    });
  }
};

export default withApiAuthRequired((req, res) => {
  return userdata(req, res);
});
