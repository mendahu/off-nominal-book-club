import { initAuth0 } from '@auth0/nextjs-auth0';
import config from './config'

export default initAuth0({
  domain: config.AUTH0_DOMAIN,
  clientId: config.AUTH0_CLIENT_ID,
  clientSecret: config.AUTH0_CLIENT_SECRET,
  scope: config.AUTH0_SCOPE,
  domain: config.AUTH0_DOMAIN,
  redirectUri: config.REDIRECT_URI,
  postLogoutRedirectUri: config.POST_LOGOUT_REDIRECT_URI,
  session: {
    // The secret used to encrypt the cookie.
    cookieSecret: config.SESSION_COOKIE_SECRET,
    // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    cookieLifetime: config.SESSION_COOKIE_LIFETIME,
    // (Optional) The cookie domain this should run on. Leave it blank to restrict it to your domain.
    storeIdToken: false,
    storeRefreshToken: false,
    storeAccessToken: false
  }
});