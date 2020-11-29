import { update } from '../../../../pages/api/users/update';
import auth0 from '../../../../lib/auth0';
import { getAuth0User } from '../../../helpers/auth0/auth0User';
import { updateUser } from '../../../../db/queries/users';

jest.mock('../../../../lib/auth0');
jest.mock('../../../helpers/auth0/auth0User');
jest.mock('../../../../db/queries/users');

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

  describe('Method Checks', () => {
    const generateMockReqWithMethod = (method: string): NextApiRequest => {
      return {
        method,
      } as NextApiRequest;
    };

    it('should return 405 if DELETE method used', async () => {
      const response = await update(
        generateMockReqWithMethod('DELETE'),
        mockRes()
      );
      expect(response.status).toEqual(405);
    });

    it('should return 405 if PUT method used', async () => {
      const response = await update(
        generateMockReqWithMethod('PUT'),
        mockRes()
      );
      expect(response.status).toEqual(405);
    });

    it('should return 405 if POST method used', async () => {
      const response = await update(
        generateMockReqWithMethod('POST'),
        mockRes()
      );
      expect(response.status).toEqual(405);
    });

    it('should return 405 if GET method used', async () => {
      const response = await update(
        generateMockReqWithMethod('GET'),
        mockRes()
      );
      expect(response.status).toEqual(405);
    });
  });

  it('return success if db call is successful', async () => {
    const mockReq = {
      body: {
        name: 'Jake',
      },
      method: 'PATCH',
    };

    updateUser.mockImplementationOnce((id, body) => Promise.resolve());

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
      method: 'PATCH',
    };

    updateUser.mockImplementationOnce((id, body) => Promise.reject());

    const response = await update(mockReq, mockRes());
    expect(response.status).toEqual(500);
  });
});