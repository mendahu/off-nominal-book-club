const Dotenv = require("dotenv-webpack");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new Dotenv({ silent: true }));
    return {
      ...config,
      node: { fs: 'empty' }
      }
   },
  serverRuntimeConfig: {
    PAT_CLIENT_ID: process.env.PAT_CLIENT_ID,
    PAT_REDIRECT_URI: process.env.PAT_REDIRECT_URI
  }
};

