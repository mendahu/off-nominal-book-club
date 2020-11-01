import { NextApiRequest, NextApiResponse } from 'next';
import { tags } from '../../../pages/api/tags';
import { getAllTags } from '../../../db/queries/tags';

jest.mock('../../../db/queries/tags');

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

  it('should return 405 if DELETE method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'DELETE',
    };

    const response = await tags(mockReq, mockRes());
    expect(response.status).toEqual(405);
  });

  it('should return 405 if PUT method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'PUT',
    };

    const response = await tags(mockReq, mockRes());
    expect(response.status).toEqual(405);
  });

  it('should return 405 if POST method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'POST',
    };

    const response = await tags(mockReq, mockRes());
    expect(response.status).toEqual(405);
  });

  it('should return 405 if PATCH method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'PATCH',
    };

    const response = await tags(mockReq, mockRes());
    expect(response.status).toEqual(405);
  });

  it('should return results if new Tag write succeeds', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
    };

    const mockResponse = { rows: [{ tag1: 1 }, { tag: 2 }] };

    getAllTags.mockImplementationOnce(() => mockResponse);

    const response = await tags(mockReq, mockRes());
    expect(response.status).toEqual(200);
    expect(response.response).toEqual(mockResponse.rows);
  });

  it('should return error if new Tags read fails', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
    };

    getAllTags.mockRejectedValueOnce();

    const response = await tags(mockReq, mockRes());
    expect(response.status).toEqual(500);
    expect(response.response).toHaveProperty('message');
  });
});
