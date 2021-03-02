import axios from "axios";

const sendPasswordReset = async (email: string) => {
  const url = `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/dbconnections/change_password`;

  const data = {
    client_id: process.env.NEXT_PUBLIC_AUTHO_CLIENT_ID,
    email,
    connection: "Username-Password-Authentication",
  };

  const options = {
    headers: { "content-type": "application/json" },
  };

  return await axios.post(url, data, options);
};

export default sendPasswordReset;
