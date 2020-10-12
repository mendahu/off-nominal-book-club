import { newBook } from '../../../../pages/api/books/new';
import auth0 from '../../../../lib/auth0';
import { getAuth0User } from '../../../helpers/auth0/auth0User';
import { books } from '../../../../db/queries/books';

jest.mock('../../../../lib/auth0');
jest.mock('../../../helpers/auth0/auth0User');
jest.mock('../../../../db/queries/books');

auth0.getSession.mockImplementation((req) => ({ user: { sub: 'testsub' } }));
getAuth0User.mockImplementation((sub) => ({ app_metadata: { onbc_id: 1 } }));

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

  it('return success if db call is successful', async () => {
    const mockReq = {
      body: {
        name: 'Jake',
      },
    };

    users.update.mockImplementationOnce((id, body) => Promise.resolve());

    const response = await update(mockReq, mockRes());
    expect(response.status).toEqual(200);
    expect(response.response).toEqual({
      message: 'user entry update successful',
    });
  });

  it('return failure if db call is unsuccessful', async () => {
    const mockReq = {
      body: {
        name: 'Jake',
      },
    };

    users.update.mockImplementationOnce((id, body) => Promise.reject());

    const response = await update(mockReq, mockRes());
    expect(response.status).toEqual(500);
  });
});
