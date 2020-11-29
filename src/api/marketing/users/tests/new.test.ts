import { NextApiRequest } from 'next';
import { newMarketingUser } from '../../../../../pages/api/marketing/users/new';

describe('api/marketing/users/new', () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Method Checks', () => {
    const generateMockReqWithMethod = (method: string): NextApiRequest => {
      return {
        method,
      } as NextApiRequest;
    };

    it('should return 405 if DELETE method used', async () => {
      const response = await newMarketingUser(
        generateMockReqWithMethod('DELETE'),
        mockRes()
      );
      expect(response.status).toEqual(405);
    });

    it('should return 405 if PUT method used', async () => {
      const response = await newMarketingUser(
        generateMockReqWithMethod('PUT'),
        mockRes()
      );
      expect(response.status).toEqual(405);
    });

    it('should return 405 if GET method used', async () => {
      const response = await newMarketingUser(
        generateMockReqWithMethod('GET'),
        mockRes()
      );
      expect(response.status).toEqual(405);
    });

    it('should return 405 if PATCH method used', async () => {
      const response = await newMarketingUser(
        generateMockReqWithMethod('PATCH'),
        mockRes()
      );
      expect(response.status).toEqual(405);
    });
  });
});
