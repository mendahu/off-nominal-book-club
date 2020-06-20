import axios from 'axios';

export const usePasswordReset = (email) => {
  const sendPasswordReset = async () => {
    const url = `https://${process.env.AUTH0_DOMAIN}/dbconnections/change_password`;
    const data = {
      client_id: process.env.AUTHO_CLIENT_ID,
      email,
      connection: 'Username-Password-Authentication',
    };
    const options = {
      headers: { 'content-type': 'application/json' },
    };
    try {
      await axios.post(url, data, options);
      return 'success';
    } catch (err) {
      console.error(err);
      return 'failure';
    }
  };

  return { sendPasswordReset };
};
