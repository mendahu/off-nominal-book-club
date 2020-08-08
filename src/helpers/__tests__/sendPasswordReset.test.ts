import axios from 'axios';
import sendPasswordReset from '../sendPasswordReset';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('sendPasswordReset', () => {
  const testEmail = 'jake@jake.com';

  it('it should send an axios request with the correct parameters', () => {
    sendPasswordReset(testEmail);

    const url = 'https://undefined/dbconnections/change_password';
    const data = {
      client_id: undefined,
      email: testEmail,
      connection: 'Username-Password-Authentication',
    };
    const options = {
      headers: { 'content-type': 'application/json' },
    };

    expect(mockedAxios.post).toHaveBeenCalledWith(url, data, options);
  });
});
