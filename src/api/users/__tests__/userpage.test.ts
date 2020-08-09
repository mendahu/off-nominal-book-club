import endpoint from '../../../../pages/api/users/[id]';
import { users } from '../../../../db/queries/users';

jest.mock('../../../../db/queries/users');

describe('users /[id]', () => {
  const mockReq = {
    query: {
      id: 1,
    },
  };

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

  it('return success if db call is successful', async () => {
    users.getUserData.mockImplementationOnce((id) => Promise.resolve());

    const response = await endpoint(mockReq, mockRes());
    expect(response.status).toEqual(200);
  });

  it('return failure if db call is unsuccessful', async () => {
    users.getUserData.mockImplementationOnce((id) => Promise.reject());

    const response = await endpoint(mockReq, mockRes());
    expect(response.status).toEqual(404);
  });
});
