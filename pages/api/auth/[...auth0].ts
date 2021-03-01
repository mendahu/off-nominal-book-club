import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";

const baseURL = process.env.AUTH0_BASE_URL;
const redirectUri = `${baseURL}/users/register`;

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { redirectUri });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
