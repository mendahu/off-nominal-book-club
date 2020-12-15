import { NextApiRequest } from 'next';
import { QueryResult } from 'pg';
import { getAllBooks } from '../../../../db/queries/books';
import books from '../../../../pages/api/books';
import { ApiBook } from '../../../types/api/apiTypes';
import { BookType } from '../../../types/common.d';
jest.mock('../../../../db/queries/books');

describe('/pages/api/books', () => {
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

    const response = await books(mockReq as NextApiRequest, mockRes());
    expect(response.status).toEqual(405);
  });

  it('should return 405 if PUT method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'PUT',
    };

    const response = await books(mockReq as NextApiRequest, mockRes());
    expect(response.status).toEqual(405);
  });

  it('should return 405 if POST method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'POST',
    };

    const response = await books(mockReq as NextApiRequest, mockRes());
    expect(response.status).toEqual(405);
  });

  it('should return 405 if PATCH method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'PATCH',
    };

    const response = await books(mockReq as NextApiRequest, mockRes());
    expect(response.status).toEqual(405);
  });

  it('should return good response if API succeeds', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
    };

    const sampleBook: ApiBook = {
      id: 5,
      title: 'a book',
      description: 'a long description of a book',
      year: '2001',
      google_id: '1234abcd',
      type: BookType.fiction,
      reads: 7,
      wishlist: 5,
      favourites: 3,
      rating: 3.8,
      authors_string: 'Author 1, Author 2',
      tags: [
        {
          id: 5,
          count: 6,
          label: 'mars',
        },
      ],
    };

    getAllBooks.mockResolvedValueOnce({
      rows: [sampleBook],
      rowCount: 1,
      oid: 3,
      command: 'GET',
      fields: [],
    } as QueryResult<ApiBook>);

    const response = await books(mockReq as NextApiRequest, mockRes());
    expect(response.status).toEqual(200);
    expect(response.response).toEqual([sampleBook]);
  });

  it('should return error if API fails', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
    };

    getAllBooks.mockRejectedValueOnce('womp');

    const response = await books(mockReq as NextApiRequest, mockRes());
    expect(response.status).toEqual(500);
    expect(response.response).toEqual({ message: 'Something went wrong' });
  });
});
