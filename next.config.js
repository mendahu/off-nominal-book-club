const Dotenv = require("dotenv-webpack");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new Dotenv({ silent: true }));
    return {
      ...config,
      node: { fs: 'empty' }
      }
   },
   env: {
    PAT_REDIRECT_URI: process.env.PAT_REDIRECT_URI,
    PAT_CLIENT_ID: process.env.PAT_CLIENT_ID,
   }
};

