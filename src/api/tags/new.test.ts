import { NextApiRequest, NextApiResponse } from 'next';
import { newTag } from '../../../pages/api/tags/new';
import userProfileFetcher from '../../../src/helpers/userProfileFetcher';
import { add, getTagIdByName } from '../../../db/queries/tags/';

jest.mock('../../../db/queries/tags');
jest.mock('../../../src/helpers/userProfileFetcher');

userProfileFetcher.mockImplementation((req) => ({ isPatron: true }));

describe('tags /newTag', () => {
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

    const response = await newTag(mockReq, mockRes());
    expect(response.status).toEqual(405);
  });

  it('should return 405 if PUT method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'PUT',
    };

    const response = await newTag(mockReq, mockRes());
    expect(response.status).toEqual(405);
  });

  it('should return 405 if GET method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
    };

    const response = await newTag(mockReq, mockRes());
    expect(response.status).toEqual(405);
  });

  it('should return 405 if PATCH method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'PATCH',
    };

    const response = await newTag(mockReq, mockRes());
    expect(response.status).toEqual(405);
  });

  it('should return 400 if tagName is missing', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'POST',
      body: {},
    };

    const response = await newTag(mockReq, mockRes());
    expect(response.status).toEqual(400);
    expect(response.response).toHaveProperty('message');
  });

  it('should return authentication error if user authentication has error', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'POST',
      body: {
        tagName: 'space',
      },
    };

    userProfileFetcher.mockRejectedValueOnce('error');

    const response = await newTag(mockReq, mockRes());
    expect(response.status).toEqual(500);
    expect(response.response).toHaveProperty('error');
    expect(response.response).toHaveProperty('message');
  });

  it('should return authentication error if user is not a Patron', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'POST',
      body: {
        tagName: 'space',
      },
    };

    userProfileFetcher.mockImplementationOnce(() => ({ isPatron: false }));

    const response = await newTag(mockReq, mockRes());
    expect(response.status).toEqual(403);
    expect(response.response).toHaveProperty('error');
    expect(response.response).toHaveProperty('message');
  });

  it('should return results if tag exists and new Tag write succeeds', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'POST',
      body: {
        tagName: 'space',
      },
    };

    const mockResponse = [{ id: 1 }];
    getTagIdByName.mockImplementationOnce(() => mockResponse);

    const response = await newTag(mockReq, mockRes());
    expect(response.status).toEqual(200);
    expect(response.response).toEqual(mockResponse[0]);
  });

  it('should return results if tag does not exist and new Tag write succeeds', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'POST',
      body: {
        tagName: 'space',
      },
    };

    const mockResponse = [1];

    getTagIdByName.mockImplementationOnce(() => []);
    add.mockImplementationOnce(() => mockResponse);

    const response = await newTag(mockReq, mockRes());
    expect(response.status).toEqual(200);
    expect(response.response).toEqual({ id: mockResponse[0] });
  });

  it('should return error if new tag lookup fails', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'POST',
      body: {
        tagName: 'space',
      },
    };

    getTagIdByName.mockRejectedValueOnce();

    const response = await newTag(mockReq, mockRes());
    expect(response.status).toEqual(500);
    expect(response.response).toHaveProperty('message');
  });

  it('should return error if new tag write fails', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'POST',
      body: {
        tagName: 'space',
      },
    };

    getTagIdByName.mockImplementationOnce(() => []);
    add.mockRejectedValueOnce();

    const response = await newTag(mockReq, mockRes());
    expect(response.status).toEqual(500);
    expect(response.response).toHaveProperty('message');
  });
});
