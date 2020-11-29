import { NextApiRequest } from 'next';
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

describe('Auth0 /me', () => {
  const mockRes = () => {
    const res: any = {};
    res.status = (code) => {
      res.status = code;
      return res;
    };
    res.json = (response) => {
      res.response = response;
      return res;
    };
    return res;
  };

  describe('Method Checks', () => {
    const generateMockReqWithMethod = (method: string): NextApiRequest => {
      return {
        method,
      } as NextApiRequest;
    };

    it('should return 405 if DELETE method used', async () => {
      const response = await me(generateMockReqWithMethod('DELETE'), mockRes());
      expect(response.status).toEqual(405);
    });

    it('should return 405 if PUT method used', async () => {
      const response = await me(generateMockReqWithMethod('PUT'), mockRes());
      expect(response.status).toEqual(405);
    });

    it('should return 405 if POST method used', async () => {
      const response = await me(generateMockReqWithMethod('POST'), mockRes());
      expect(response.status).toEqual(405);
    });

    it('should return 405 if PATCH method used', async () => {
      const response = await me(generateMockReqWithMethod('PATCH'), mockRes());
      expect(response.status).toEqual(405);
    });
  });

  describe('Return values', () => {
    let mockReq: Partial<NextApiRequest>;

    beforeEach(() => {
      mockReq = {
        method: 'GET',
      };
    });

    it('returns the user profile', async () => {
      userProfileFetcher.mockResolvedValueOnce(testUser);
      const response = await me(mockReq, mockRes());
      expect(response.response).toEqual(testUser);
    });

    it('throws an error if API fails', async () => {
      userProfileFetcher.mockRejectedValueOnce('womp');
      const response = await me(mockReq, mockRes());
      expect(response.status).toEqual(500);
    });
  });
});
