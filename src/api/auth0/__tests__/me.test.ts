import me from '../../../../pages/api/auth0/me';
import userProfileFetcher from '../../../helpers/userProfileFetcher';

jest.mock('../../../helpers/userProfileFetcher');

const testUser = {
  onbc_id: 1,
  name: 'Jake',
  email: 'jake@jake.com',
  bio: 'a bio',
  avatar: 'avatar.jpg',
  patreon: 'unchecked',
  favourites: [],
  reads: [],
  wishlist: [],
  ratings: [],
  isPatron: false,
};

const mockError = {
  status: 401,
  name: 'An Error!',
  message: 'Something has gone wrong.',
};

describe('Auth0 /me', () => {
  const mockRes = () => {
    const res: any = {};
    res.status = () => res;
    res.end = (response) => response;
    return res;
  };

  it('returns the user profile', async () => {
    userProfileFetcher.mockImplementationOnce(() => Promise.resolve(testUser));
    const response = await me({}, mockRes());
    expect(response).toEqual(JSON.stringify(testUser));
  });

  it('throws an error if API fails', async () => {
    const mockRes = () => {
      const res: any = {};
      res.status = () => res;
      res.end = (response) => response;
      return res;
    };

    userProfileFetcher.mockImplementationOnce(() => Promise.reject(mockError));
    const response = await me({}, mockRes());
    expect(response).toEqual(JSON.stringify(mockError));
  });
});
