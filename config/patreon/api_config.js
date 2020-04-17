const user_schema = require('patreon/dist/schemas/user')

export const callOptions = {
  fields: {
    user: [...user_schema.default.attributes.first_name]
  }
}

export const tokenOptions = {
  client_id: process.env.PAT_CLIENT_ID,
  redirect_uri: process.env.PAT_REDIRECT_URI,
  scope: 'identity'
}

export default { callOptions, tokenOptions };