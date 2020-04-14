module.exports = {
  webpack: (config) => {
    return {
      ...config,
      node: {
        fs:
          'empty'
        }
      }
   },
  env: {
    PAT_CLIENT_ID: process.env.PAT_CLIENT_ID,
    PAT_REDIRECT_URI: process.env.PAT_REDIRECT_URI
  }
};