import { addDays } from 'date-fns';
import patreonProfileFetcher from '../profileFetcher';
import tokenFetcher from '../tokenFetcher';
import axios from 'axios';
jest.mock('../tokenFetcher');
jest.mock('axios');

tokenFetcher.mockResolvedValue({
  expiry_date: addDays(new Date(), 30),
  token_type: 'Bearer',
  access_token: '456test',
});

describe('Patreon Profile Fetcher', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call token fetcher with correct arguments if token is expired', () => {
    const result = patreonProfileFetcher('sub', {
      expiry_date: new Date(1969, 6, 20),
      refresh_token: 'refreshToken',
    });
    expect(tokenFetcher).toHaveBeenCalledTimes(1);
    expect(tokenFetcher).toHaveBeenCalledWith(null, 'sub', {
      refresh: true,
      refreshToken: 'refreshToken',
    });
  });

  it('should not call token fetcher if token is not expired', () => {
    const result = patreonProfileFetcher('sub', {
      expiry_date: addDays(new Date(), 1),
    });
    expect(tokenFetcher).toHaveBeenCalledTimes(0);
  });

  it('should call axios.get with correct parameters when token is not expired', async () => {
    const result = await patreonProfileFetcher('sub', {
      expiry_date: addDays(new Date(), 1),
      token_type: 'Bearer',
      access_token: '123test',
    });

    const expectedUrl =
      'https://www.patreon.com/api/oauth2/v2/identity?include=memberships,memberships.campaign&fields%5Buser%5D=full_name,image_url,thumb_url&fields%5Bmember%5D=patron_status,currently_entitled_amount_cents,last_charge_date,pledge_relationship_start&fields%5Bcampaign%5D=creation_name';

    const expectedHeaders = {
      Authorization: `Bearer 123test`,
    };
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(expectedUrl, {
      headers: expectedHeaders,
    });
  });

  it('should call axios.get with correct parameters when token is expired', async () => {
    const result = await patreonProfileFetcher('sub', {
      expiry_date: new Date(1969, 6, 20),
      token_type: 'Bearer',
      access_token: '123test',
    });

    const expectedUrl =
      'https://www.patreon.com/api/oauth2/v2/identity?include=memberships,memberships.campaign&fields%5Buser%5D=full_name,image_url,thumb_url&fields%5Bmember%5D=patron_status,currently_entitled_amount_cents,last_charge_date,pledge_relationship_start&fields%5Bcampaign%5D=creation_name';

    const expectedHeaders = {
      Authorization: `Bearer 456test`,
    };
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(expectedUrl, {
      headers: expectedHeaders,
    });
  });
});
