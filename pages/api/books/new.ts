import { addBook, confirmBook } from "../../../db/queries/books";
import userProfileFetcher from "../../../src/helpers/userProfileFetcher";
import { NextApiRequest, NextApiResponse } from "next";
import { DisplayUser } from "../../../src/types/common";
import {
  ApiConfirmBookObj,
  ApiErrorResponse,
} from "../../../src/types/api/apiTypes";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import getAuth0USerSub from "../../../src/helpers/auth0/auth0Sub";

export const newBook = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiConfirmBookObj | ApiErrorResponse>
) => {
  // verify Patreon status

  let userProfile: DisplayUser;

  try {
    const sub = await getAuth0USerSub(req, res);
    userProfile = await userProfileFetcher(sub);
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      message: "Something went wrong authenticating your request.",
    });
  }

  if (!userProfile.isPatron) {
    return res.status(403).json({
      error: "Not Authenticated",
      message: "Access restricted to logged in patrons only.",
    });
  }

  const { method } = req;
  let bookObj: ApiConfirmBookObj;

  switch (method) {
    case "GET":
      if (!req.query) {
        return res.status(400).json({
          error: "Bad request",
          message:
            "You are missing required query string parameters for this request",
        });
      }

      const { query } = req;

      if (
        typeof query.google_id !== "string" &&
        typeof query.google_id !== "undefined"
      ) {
        return res.status(400).json({
          error: "Bad request",
          message: "Query parameters must be strings.",
        });
      }
      if (
        typeof query.isbn13 !== "string" &&
        typeof query.isbn13 !== "undefined"
      ) {
        return res.status(400).json({
          error: "Bad request",
          message: "Query parameters must be strings.",
        });
      }
      if (
        typeof query.title !== "string" &&
        typeof query.title !== "undefined"
      ) {
        return res.status(400).json({
          error: "Bad request",
          message: "Query parameters must be strings.",
        });
      }

      bookObj = {
        google_id: query.google_id || null,
        isbn13: query.isbn13 || null,
        title: query.title || null,
      };

      try {
        const response = await confirmBook(bookObj);
        return res.status(200).json(response);
      } catch (error) {
        return res.status(500).json(error);
      }

    case "POST":
      if (!req.body) {
        return res.status(400).json({
          error: "Bad request",
          message: "You are missing required body for this request",
        });
      }

      bookObj = req.body;

      try {
        const response = await addBook(bookObj);
        return res.status(200).json(response);
      } catch (error) {
        return res.status(500).json(error);
      }

    default:
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
};

export default withApiAuthRequired((req, res) => newBook(req, res));
