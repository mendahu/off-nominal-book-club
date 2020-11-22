import { NextApiRequest, NextApiResponse } from 'next';
import { newTagRel } from '../../../../pages/api/tagRels/new';
import userProfileFetcher from '../../../helpers/userProfileFetcher';
import { tagRels } from '../../../../db/queries/tagRels';

jest.mock('../../../../db/queries/tagRels');
jest.mock('../../../helpers/userProfileFetcher');

userProfileFetcher.mockImplementation((req) => ({ isPatron: true }));

describe('tagRels /newTagRel', () => {
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

    const response = await newTagRel(mockReq, mockRes());
    expect(response.status).toEqual(405);
  });

  it('should return 405 if PUT method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'PUT',
    };

    const response = await newTagRel(mockReq, mockRes());
    expect(response.status).toEqual(405);
  });

  it('should return 405 if GET method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
    };

    const response = await newTagRel(mockReq, mockRes());
    expect(response.status).toEqual(405);
  });

  it('should return 405 if PATCH method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'PATCH',
    };

    const response = await newTagRel(mockReq, mockRes());
    expect(response.status).toEqual(405);
  });

  it('should return 400 if userId is missing', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'POST',
      body: {
        tagId: '5',
        bookId: '10',
      },
    };

    const response = await newTagRel(mockReq, mockRes());
    expect(response.status).toEqual(400);
    expect(response.response).toHaveProperty('message');
  });

  it('should return 400 if tagId is missing', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'POST',
      body: {
        userId: '5',
        bookId: '10',
      },
    };

    const response = await newTagRel(mockReq, mockRes());
    expect(response.status).toEqual(400);
    expect(response.response).toHaveProperty('message');
  });

  it('should return 400 if bookId is missing', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'POST',
      body: {
        tagId: '5',
        userId: '10',
      },
    };

    const response = await newTagRel(mockReq, mockRes());
    expect(response.status).toEqual(400);
    expect(response.response).toHaveProperty('message');
  });

  it('should return authentication error if user authentication has error', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'POST',
      body: {
        userId: '1',
        tagId: '5',
        bookId: '10',
      },
    };

    userProfileFetcher.mockRejectedValueOnce('error');

    const response = await newTagRel(mockReq, mockRes());
    expect(response.status).toEqual(500);
    expect(response.response).toHaveProperty('error');
    expect(response.response).toHaveProperty('message');
  });

  it('should return authentication error if user is not a Patron', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'POST',
      body: {
        userId: '1',
        tagId: '5',
        bookId: '10',
      },
    };

    userProfileFetcher.mockImplementationOnce(() => ({ isPatron: false }));

    const response = await newTagRel(mockReq, mockRes());
    expect(response.status).toEqual(403);
    expect(response.response).toHaveProperty('error');
    expect(response.response).toHaveProperty('message');
  });

  it('should return results if new Tag write succeeds', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'POST',
      body: {
        userId: '1',
        tagId: '5',
        bookId: '10',
      },
    };

    const mockResponse = [15];

    tagRels.add.mockImplementationOnce(() => mockResponse);

    const response = await newTagRel(mockReq, mockRes());
    expect(response.status).toEqual(200);
    expect(response.response).toEqual(mockResponse);
  });

  it('should return error if new Tag write fails', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'POST',
      body: {
        userId: '1',
        tagId: '5',
        bookId: '10',
      },
    };

    tagRels.add.mockRejectedValueOnce();

    const response = await newTagRel(mockReq, mockRes());
    expect(response.status).toEqual(500);
    expect(response.response).toHaveProperty('message');
  });
});
