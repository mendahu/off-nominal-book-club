import { NextApiRequest, NextApiResponse } from 'next';
import { tags } from '../../../../pages/api/tags';
import { getAllTags, SortBy } from '../../../../db/queries/tags';
import { AxiosResponse } from 'axios';

jest.mock('../../../../db/queries/tags');

describe('tags API', () => {
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
      const response = await tags(
        generateMockReqWithMethod('DELETE'),
        mockRes()
      );
      expect(response.status).toEqual(405);
    });

    it('should return 405 if PUT method used', async () => {
      const response = await tags(generateMockReqWithMethod('PUT'), mockRes());
      expect(response.status).toEqual(405);
    });

    it('should return 405 if POST method used', async () => {
      const response = await tags(generateMockReqWithMethod('POST'), mockRes());
      expect(response.status).toEqual(405);
    });

    it('should return 405 if PATCH method used', async () => {
      const response = await tags(
        generateMockReqWithMethod('PATCH'),
        mockRes()
      );
      expect(response.status).toEqual(405);
    });
  });

  describe('Query String Checks', () => {
    it('should return 400 if an Array is passed', async () => {
      const mockReq: Partial<NextApiRequest> = {
        method: 'GET',
        query: {
          sort: ['label', 'count'],
        },
      };

      const response = await tags(mockReq as NextApiRequest, mockRes());
      expect(response.status).toEqual(400);
    });

    it('should return 400 if an invalid query string is passed', async () => {
      const mockReq: Partial<NextApiRequest> = {
        method: 'GET',
        query: {
          sort: 'bananas',
        },
      };

      const response = await tags(mockReq as NextApiRequest, mockRes());
      expect(response.status).toEqual(400);
    });
  });

  describe('Response Checks', () => {
    it('should return results ordered by label if no query string passed', async () => {
      const mockReq: Partial<NextApiRequest> = {
        method: 'GET',
      };

      const mockResponse = [{ tag1: 1 }, { tag: 2 }];

      getAllTags.mockImplementationOnce(() => mockResponse);

      const response = await tags(mockReq as NextApiRequest, mockRes());
      expect(getAllTags).toHaveBeenCalledWith(SortBy.label);
      expect(response.status).toEqual(200);
      expect(response.response).toEqual(mockResponse);
    });

    it('should return results ordered by label if undefined query string passed', async () => {
      const mockReq: Partial<NextApiRequest> = {
        method: 'GET',
        query: {
          sort: undefined,
        },
      };

      const mockResponse = [{ tag1: 1 }, { tag: 2 }];

      getAllTags.mockImplementationOnce(() => mockResponse);

      const response = await tags(mockReq as NextApiRequest, mockRes());
      expect(getAllTags).toHaveBeenCalledWith(SortBy.label);
      expect(response.status).toEqual(200);
      expect(response.response).toEqual(mockResponse);
    });

    it('should return results ordered by label if label query string passed', async () => {
      const mockReq: Partial<NextApiRequest> = {
        method: 'GET',
        query: {
          sort: 'label',
        },
      };

      const mockResponse = [{ tag1: 1 }, { tag: 2 }];

      getAllTags.mockImplementationOnce(() => mockResponse);

      const response = await tags(mockReq as NextApiRequest, mockRes());
      expect(getAllTags).toHaveBeenCalledWith(SortBy.label);
      expect(response.status).toEqual(200);
      expect(response.response).toEqual(mockResponse);
    });

    it('should return results ordered by count if count query string passed', async () => {
      const mockReq: Partial<NextApiRequest> = {
        method: 'GET',
        query: {
          sort: 'count',
        },
      };

      const mockResponse = [{ tag1: 1 }, { tag: 2 }];

      getAllTags.mockImplementationOnce(() => mockResponse);

      const response = await tags(mockReq as NextApiRequest, mockRes());
      expect(getAllTags).toHaveBeenCalledWith(SortBy.count);
      expect(response.status).toEqual(200);
      expect(response.response).toEqual(mockResponse);
    });
  });

  describe('Error Checks', () => {
    it('should return error if new Tags read fails', async () => {
      const mockReq: Partial<NextApiRequest> = {
        method: 'GET',
      };

      getAllTags.mockRejectedValueOnce();

      const response = await tags(mockReq as NextApiRequest, mockRes());
      expect(response.status).toEqual(500);
      expect(response.response).toHaveProperty('message');
    });
  });
});
