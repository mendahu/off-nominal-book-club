require('dotenv').config();

module.exports = {
  webpack: (config) => {
    return {
      ...config,
      node: { fs: 'empty' },
    };
  },
  env: {
    PAT_CLIENT_ID: process.env.PAT_CLIENT_ID,
    PAT_CLIENT_SECRET: process.env.PAT_CLIENT_SECRET,
    PAT_REDIRECT_URI: process.env.PAT_REDIRECT_URI,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_SCOPE: process.env.AUTH0_SCOPE,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    REDIRECT_URI: process.env.REDIRECT_URI,
    POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI,
  },
};
