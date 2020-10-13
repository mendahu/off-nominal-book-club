import { NextApiRequest, NextApiResponse } from 'next';
import { newBook } from '../../../pages/api/books/new';
import userProfileFetcher from '../../../src/helpers/userProfileFetcher';
import { books } from '../../../db/queries/books';

jest.mock('../../../db/queries/books');
jest.mock('../../../src/helpers/userProfileFetcher');

userProfileFetcher.mockImplementation((req) => ({ isPatron: true }));

describe('users /update', () => {
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

  it('should return server error if user authentication has error', async () => {
    const mockReq: Partial<NextApiRequest> = {
      query: {
        googleid: '12345678',
        isbn13: 'abc123def456g',
        title: 'A book about space',
      },
    };

    userProfileFetcher.mockRejectedValueOnce('error');

    const response = await newBook(mockReq, mockRes());
    expect(response.status).toEqual(500);
    expect(response.response).toHaveProperty('error');
    expect(response.response).toHaveProperty('message');
  });

  it('should return server error is user authentication fails', async () => {
    const mockReq: Partial<NextApiRequest> = {
      query: {
        googleid: '12345678',
        isbn13: 'abc123def456g',
        title: 'A book about space',
      },
    };

    userProfileFetcher.mockImplementationOnce((req) => ({ isPatron: false }));

    const response = await newBook(mockReq, mockRes());
    expect(response.status).toEqual(403);
    expect(response.response).toHaveProperty('error');
    expect(response.response).toHaveProperty('message');
  });

  it('should return bad request if no query string provided', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
    };

    const response = await newBook(mockReq, mockRes());
    expect(response.status).toEqual(400);
    expect(response.response).toHaveProperty('error');
    expect(response.response).toHaveProperty('message');
  });

  it('should return success if GET call succeeds', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
      query: {
        googleid: '12345678',
        isbn13: 'abc123def456g',
        title: 'A book about space',
      },
    };

    const mockResponse = { message: 'success' };

    books.confirm.mockImplementationOnce(() => mockResponse);

    const response = await newBook(mockReq, mockRes());
    expect(response.status).toEqual(200);
    expect(response.response).toHaveProperty('message');
    expect(response.response).toEqual(mockResponse);
  });

  it('should return failure if GET call fails', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
      query: {
        googleid: '12345678',
        isbn13: 'abc123def456g',
        title: 'A book about space',
      },
    };

    books.confirm.mockRejectedValueOnce('error');

    const response = await newBook(mockReq, mockRes());
    expect(response.status).toEqual(500);
    expect(response.response).toEqual('error');
  });

  it('should return bad request if no body provided', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'POST',
    };

    const response = await newBook(mockReq, mockRes());
    expect(response.status).toEqual(400);
    expect(response.response).toHaveProperty('error');
    expect(response.response).toHaveProperty('message');
  });

  it('should return success if POST call succeeds', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'POST',
      body: {
        title: 'A book about space',
      },
    };

    const mockResponse = { message: 'success' };

    books.add.mockImplementationOnce(() => mockResponse);

    const response: NextApiResponse = await newBook(mockReq, mockRes());
    expect(response.status).toEqual(200);
    expect(response.response).toHaveProperty('message');
    expect(response.response).toEqual(mockResponse);
  });

  it('should return failure if POST call fails', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'POST',
      body: {
        title: 'A book about space',
      },
    };

    books.add.mockRejectedValueOnce('error');

    const response = await newBook(mockReq, mockRes());
    expect(response.status).toEqual(500);
    expect(response.response).toEqual('error');
  });

  it('should return 405 if PUT method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'PUT',
    };

    const response = await newBook(mockReq, mockRes());
    expect(response.status).toEqual(405);
  });
  it('should return 405 if PATCH method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'PATCH',
    };

    const response = await newBook(mockReq, mockRes());
    expect(response.status).toEqual(405);
  });
  it('should return 405 if DELETE method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'DELETE',
    };

    const response = await newBook(mockReq, mockRes());
    expect(response.status).toEqual(405);
  });
});
