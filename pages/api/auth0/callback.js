import auth0 from '../../../lib/auth0';

export default async function callback(req, res) {

  try {
    await auth0.handleCallback(req, res, { redirectTo: '/users/register'});
  } catch (error) {
    console.error("failed callback from Auth0", error);
    res.status(error.status || 400).end(error.message);
  }

  res.status(403).end("Forbidden")
  
}