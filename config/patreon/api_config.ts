const user_schema = require('patreon/dist/schemas/user');

export const callOptions = {
  fields: {
    user: [...user_schema.default.attributes.first_name],
  },
};

interface TokenOptions {
  client_id: string;
  redirect_uri: string;
  scope: string;
  state?: string;
}

export const tokenOptions: TokenOptions = {
  client_id: process.env.PAT_CLIENT_ID,
  redirect_uri: process.env.PAT_REDIRECT_URI,
  scope: 'identity identity.memberships',
};

export default { callOptions, tokenOptions };
