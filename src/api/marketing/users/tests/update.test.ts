import { NextApiRequest } from 'next';
import { updateMarketingUser } from '../../../../../pages/api/marketing/users/update';

describe('api/marketing/users/update', () => {
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
      const response = await updateMarketingUser(
        generateMockReqWithMethod('DELETE'),
        mockRes()
      );
      expect(response.status).toEqual(405);
    });

    it('should return 405 if PUT method used', async () => {
      const response = await updateMarketingUser(
        generateMockReqWithMethod('PUT'),
        mockRes()
      );
      expect(response.status).toEqual(405);
    });

    it('should return 405 if GET method used', async () => {
      const response = await updateMarketingUser(
        generateMockReqWithMethod('GET'),
        mockRes()
      );
      expect(response.status).toEqual(405);
    });

    it('should return 405 if POST method used', async () => {
      const response = await updateMarketingUser(
        generateMockReqWithMethod('POST'),
        mockRes()
      );
      expect(response.status).toEqual(405);
    });
  });
});
