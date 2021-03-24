import { NextApiRequest, NextApiResponse } from "next";

export const allowMethod = (
  handler: (req: NextApiRequest, res: NextApiResponse) => void,
  methods: string[]
) => {
  return (req, res) => {
    const { method } = req;
    const methodIsAllowed = methods.includes(method);

    if (!methodIsAllowed) {
      const errorMessage = {
        message: `Method ${method} not allowed`,
      };

      return res.status(405).json(errorMessage);
    } else {
      return handler(req, res);
    }
  };
};
