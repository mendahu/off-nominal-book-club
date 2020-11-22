import { NextApiRequest } from 'next';
import { getUserData } from '../../../../db/queries/userdata';
import { userdata } from '../../../../pages/api/userdata';
import { ApiUserMetadata } from '../../../types/api/apiTypes';
import { QueryUserMetadatum } from '../../../types/query';

jest.mock('../../../../db/queries/userdata');

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 405 if DELETE method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'DELETE',
    };

    const response = await userdata(mockReq as NextApiRequest, mockRes());
    expect(response.status).toEqual(405);
  });

  it('should return 405 if PUT method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'PUT',
    };

    const response = await userdata(mockReq as NextApiRequest, mockRes());
    expect(response.status).toEqual(405);
  });

  it('should return 405 if POST method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'POST',
    };

    const response = await userdata(mockReq as NextApiRequest, mockRes());
    expect(response.status).toEqual(405);
  });

  it('should return 405 if PATCH method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'PATCH',
    };

    const response = await userdata(mockReq as NextApiRequest, mockRes());
    expect(response.status).toEqual(405);
  });

  it('should return 400 if bookId query string is not a string', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
      query: {
        userId: '3',
        bookId: ['hello'],
      },
    };

    const response = await userdata(mockReq as NextApiRequest, mockRes());
    expect(response.status).toEqual(400);
  });

  it('should return 400 if userId query string is not a string', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
      query: {
        userId: ['hello'],
      },
    };

    const response = await userdata(mockReq as NextApiRequest, mockRes());
    expect(response.status).toEqual(400);
  });

  it('should return correctly formatted userdata', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
      query: {
        userId: '2',
      },
    };

    const queryResponse: QueryUserMetadatum[] = [
      {
        book_id: 5,
        reads_id: 4,
        favourites_id: 1,
        wishlist_id: null,
      },
      {
        book_id: 3,
        reads_id: null,
        favourites_id: null,
        wishlist_id: null,
      },
      {
        book_id: 1,
        reads_id: null,
        favourites_id: null,
        wishlist_id: 4,
      },
    ];

    getUserData.mockResolvedValueOnce(queryResponse);

    const expectedResponse: ApiUserMetadata = {
      5: {
        reads: 4,
        favourites: 1,
        wishlist: null,
      },
      3: {
        reads: null,
        favourites: null,
        wishlist: null,
      },
      1: {
        reads: null,
        favourites: null,
        wishlist: 4,
      },
    };

    const response = await userdata(mockReq as NextApiRequest, mockRes());
    expect(getUserData).toHaveBeenCalledTimes(1);
    expect(response.status).toEqual(200);
    expect(response.response).toEqual(expectedResponse);
  });

  it('should return correctly formatted userdata', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
      query: {
        userId: '2',
        bookId: '5',
      },
    };

    const queryResponse: QueryUserMetadatum[] = [
      {
        book_id: 5,
        reads_id: 4,
        favourites_id: 1,
        wishlist_id: null,
      },
    ];

    getUserData.mockResolvedValueOnce(queryResponse);

    const expectedResponse: ApiUserMetadata = {
      5: {
        reads: 4,
        favourites: 1,
        wishlist: null,
      },
    };

    const response = await userdata(mockReq as NextApiRequest, mockRes());
    expect(getUserData).toHaveBeenCalledTimes(1);
    expect(response.status).toEqual(200);
    expect(response.response).toEqual(expectedResponse);
  });

  it('should return error if db read fails', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
      query: {
        bookId: '3',
        userId: '2',
      },
    };

    getUserData.mockRejectedValueOnce('blurp');

    const response = await userdata(mockReq as NextApiRequest, mockRes());
    expect(response.status).toEqual(500);
  });
});
