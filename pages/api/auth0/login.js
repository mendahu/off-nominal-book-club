import auth0 from '../../../lib/auth0';

export default async function handler(req, res) {
  try {
    await auth0.handleLogin(req, res);
  } catch (error) {
    res.status(error.status || 400);
    await auth0.handleLogout(req, res);
  }
}
