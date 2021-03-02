import { ManagementClient } from "auth0";

const authOptions = {
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
};

const getAuth0User = (sub) => {
  authOptions.scope = "read:users read:user_idp_tokens";
  const auth0client = new ManagementClient(authOptions);
  const params = { id: sub };

  return auth0client.getUser(params);
};

const updatePatreonData = async (sub, newData) => {
  authOptions.scope = "update:users update:users_app_metadata";
  const auth0client = new ManagementClient(authOptions);
  const params = { id: sub };

  const data = { app_metadata: { patreon: newData } };

  return auth0client.updateUser(params, data);
};

export { getAuth0User, updatePatreonData };
