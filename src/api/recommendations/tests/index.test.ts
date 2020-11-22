import { NextApiRequest } from 'next';
import {
  getFavourite,
  getRandom,
  getHighestRated,
} from '../../../../db/queries/recommendations';
import recommendations from '../../../../pages/api/recommendations';

jest.mock('../../../../db/queries/recommendations');

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

  const mockHighestRatedResponse = {
    rows: [
      {
        type: 'highest_rated',
        title: 'a book!',
        id: 5,
        authors: [
          {
            name: 'Author Person',
          },
        ],
      },
    ],
  };

  const mockFavouriteResponse = {
    rows: [
      {
        type: 'favourite',
        title: 'a book!',
        id: 2,
        authors: [
          {
            name: 'Author Person',
          },
        ],
      },
    ],
  };

  const mockRandomResponse = {
    rows: [
      {
        type: 'random',
        title: 'a book!',
        id: 3,
        authors: [
          {
            name: 'Author Person',
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 405 if DELETE method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'DELETE',
    };

    const response = await recommendations(
      mockReq as NextApiRequest,
      mockRes()
    );
    expect(response.status).toEqual(405);
  });

  it('should return 405 if PUT method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'PUT',
    };

    const response = await recommendations(
      mockReq as NextApiRequest,
      mockRes()
    );
    expect(response.status).toEqual(405);
  });

  it('should return 405 if POST method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'POST',
    };

    const response = await recommendations(
      mockReq as NextApiRequest,
      mockRes()
    );
    expect(response.status).toEqual(405);
  });

  it('should return 405 if PATCH method used', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'PATCH',
    };

    const response = await recommendations(
      mockReq as NextApiRequest,
      mockRes()
    );
    expect(response.status).toEqual(405);
  });

  it('should return 400 if type query string is not a string', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
      query: {
        type: ['hello'],
      },
    };

    const response = await recommendations(
      mockReq as NextApiRequest,
      mockRes()
    );
    expect(response.status).toEqual(400);
  });

  it('should return random recommendation if random specified', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
      query: {
        type: 'random',
      },
    };

    getRandom.mockResolvedValueOnce(mockRandomResponse);

    const response = await recommendations(
      mockReq as NextApiRequest,
      mockRes()
    );
    expect(response.status).toEqual(200);
    expect(getRandom).toHaveBeenCalledTimes(1);
    expect(getFavourite).toHaveBeenCalledTimes(0);
    expect(getHighestRated).toHaveBeenCalledTimes(0);
    expect(response.response).toEqual(mockRandomResponse.rows);
  });

  it('should return favourite recommendation if favourite specified', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
      query: {
        type: 'favourite',
      },
    };

    getFavourite.mockResolvedValueOnce(mockFavouriteResponse);

    const response = await recommendations(
      mockReq as NextApiRequest,
      mockRes()
    );
    expect(response.status).toEqual(200);
    expect(getRandom).toHaveBeenCalledTimes(0);
    expect(getFavourite).toHaveBeenCalledTimes(1);
    expect(getHighestRated).toHaveBeenCalledTimes(0);
    expect(response.response).toEqual(mockFavouriteResponse.rows);
  });

  it('should return highest rated recommendation if highest rated specified', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
      query: {
        type: 'highestrate',
      },
    };

    getHighestRated.mockResolvedValueOnce(mockHighestRatedResponse);

    const response = await recommendations(
      mockReq as NextApiRequest,
      mockRes()
    );
    expect(response.status).toEqual(200);
    expect(getRandom).toHaveBeenCalledTimes(0);
    expect(getFavourite).toHaveBeenCalledTimes(0);
    expect(getHighestRated).toHaveBeenCalledTimes(1);
    expect(response.response).toEqual(mockHighestRatedResponse.rows);
  });

  it('should return highest rated and random recommendation if highest rated and random specified', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
      query: {
        type: 'highestrate,random',
      },
    };

    getHighestRated.mockResolvedValueOnce(mockHighestRatedResponse);
    getRandom.mockResolvedValueOnce(mockRandomResponse);

    const response = await recommendations(
      mockReq as NextApiRequest,
      mockRes()
    );
    expect(response.status).toEqual(200);
    expect(getRandom).toHaveBeenCalledTimes(1);
    expect(getFavourite).toHaveBeenCalledTimes(0);
    expect(getHighestRated).toHaveBeenCalledTimes(1);
    expect(response.response).toContain(mockHighestRatedResponse.rows[0]);
    expect(response.response).toContain(mockRandomResponse.rows[0]);
  });

  it('should return random, highest rated, favourite recommendation if all three are specified', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
      query: {
        type: 'highestrate,random,favourite',
      },
    };

    getHighestRated.mockResolvedValueOnce(mockHighestRatedResponse);
    getRandom.mockResolvedValueOnce(mockRandomResponse);
    getFavourite.mockResolvedValueOnce(mockFavouriteResponse);

    const response = await recommendations(
      mockReq as NextApiRequest,
      mockRes()
    );
    expect(response.status).toEqual(200);
    expect(getRandom).toHaveBeenCalledTimes(1);
    expect(getFavourite).toHaveBeenCalledTimes(1);
    expect(getHighestRated).toHaveBeenCalledTimes(1);
    expect(response.response).toContain(mockHighestRatedResponse.rows[0]);
    expect(response.response).toContain(mockRandomResponse.rows[0]);
    expect(response.response).toContain(mockFavouriteResponse.rows[0]);
  });

  it('should return all recommendations if no query string specified', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
      query: {},
    };

    getHighestRated.mockResolvedValueOnce(mockHighestRatedResponse);
    getRandom.mockResolvedValueOnce(mockRandomResponse);
    getFavourite.mockResolvedValueOnce(mockFavouriteResponse);

    const response = await recommendations(
      mockReq as NextApiRequest,
      mockRes()
    );
    expect(response.status).toEqual(200);
    expect(getRandom).toHaveBeenCalledTimes(1);
    expect(getFavourite).toHaveBeenCalledTimes(1);
    expect(getHighestRated).toHaveBeenCalledTimes(1);
    expect(response.response).toContain(mockHighestRatedResponse.rows[0]);
    expect(response.response).toContain(mockRandomResponse.rows[0]);
    expect(response.response).toContain(mockFavouriteResponse.rows[0]);
  });

  it('should return all recommendations if all supplied', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
      query: {
        type: 'all',
      },
    };

    getHighestRated.mockResolvedValueOnce(mockHighestRatedResponse);
    getRandom.mockResolvedValueOnce(mockRandomResponse);
    getFavourite.mockResolvedValueOnce(mockFavouriteResponse);

    const response = await recommendations(
      mockReq as NextApiRequest,
      mockRes()
    );
    expect(response.status).toEqual(200);
    expect(getRandom).toHaveBeenCalledTimes(1);
    expect(getFavourite).toHaveBeenCalledTimes(1);
    expect(getHighestRated).toHaveBeenCalledTimes(1);
    expect(response.response).toContain(mockHighestRatedResponse.rows[0]);
    expect(response.response).toContain(mockRandomResponse.rows[0]);
    expect(response.response).toContain(mockFavouriteResponse.rows[0]);
  });

  it('should return error if query string has no match', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
      query: {
        type: 'banana',
      },
    };

    const response = await recommendations(
      mockReq as NextApiRequest,
      mockRes()
    );

    expect(getRandom).toHaveBeenCalledTimes(0);
    expect(getFavourite).toHaveBeenCalledTimes(0);
    expect(getHighestRated).toHaveBeenCalledTimes(0);
    expect(response.status).toEqual(400);
  });

  it('should not return a recommend if db returns none', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
      query: {
        type: 'all',
      },
    };

    getHighestRated.mockResolvedValueOnce({ rows: [] });
    getRandom.mockResolvedValueOnce(mockRandomResponse);
    getFavourite.mockResolvedValueOnce(mockFavouriteResponse);

    const response = await recommendations(
      mockReq as NextApiRequest,
      mockRes()
    );

    expect(response.status).toEqual(200);
    expect(getRandom).toHaveBeenCalledTimes(1);
    expect(getFavourite).toHaveBeenCalledTimes(1);
    expect(getHighestRated).toHaveBeenCalledTimes(1);
    expect(response.response).toContain(mockRandomResponse.rows[0]);
    expect(response.response).toContain(mockFavouriteResponse.rows[0]);
    expect(response.response).toHaveLength(2);
  });

  it('should return empty array if no recommends', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
      query: {
        type: 'all',
      },
    };

    const emptyResponse = { rows: [] };

    getHighestRated.mockResolvedValueOnce(emptyResponse);
    getRandom.mockResolvedValueOnce(emptyResponse);
    getFavourite.mockResolvedValueOnce(emptyResponse);

    const response = await recommendations(
      mockReq as NextApiRequest,
      mockRes()
    );

    expect(response.status).toEqual(200);
    expect(getRandom).toHaveBeenCalledTimes(1);
    expect(getFavourite).toHaveBeenCalledTimes(1);
    expect(getHighestRated).toHaveBeenCalledTimes(1);
    expect(response.response).toHaveLength(0);
  });

  it('should return error if db read fails', async () => {
    const mockReq: Partial<NextApiRequest> = {
      method: 'GET',
      query: {
        type: 'all',
      },
    };

    getHighestRated.mockRejectedValueOnce('blurp');
    getRandom.mockResolvedValueOnce(mockRandomResponse);
    getFavourite.mockResolvedValueOnce(mockFavouriteResponse);

    const response = await recommendations(
      mockReq as NextApiRequest,
      mockRes()
    );

    expect(response.status).toEqual(500);
  });
});
