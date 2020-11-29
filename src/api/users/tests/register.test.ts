import registerNewUser from '../../../../pages/api/users/register';
import auth from 'basic-auth';
import compare from 'tsscmp';
import { register } from '../../../../db/queries/users';
jest.mock('basic-auth');
jest.mock('tsscmp');
jest.mock('../../../../db/queries/users');

const mockResGenerator = () => {
  return () => {
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
};

describe('users / register', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return 401 if no credentials', async () => {
    const mockRes = mockResGenerator();

    auth.mockReturnValueOnce(undefined);
    compare.mockReturnValueOnce(false);
    compare.mockReturnValueOnce(false);

    const response = await registerNewUser({}, mockRes());
    expect(response.status).toEqual(401);
    expect(response.response).toEqual({ message: 'Access denied' });
  });

  it('should return 401 if user name is invalid', async () => {
    const mockRes = mockResGenerator();

    auth.mockReturnValueOnce({
      name: 'jake',
      pass: 'password',
    });
    compare.mockReturnValueOnce(false);
    compare.mockReturnValueOnce(true);

    const response = await registerNewUser({}, mockRes());
    expect(response.status).toEqual(401);
    expect(response.response).toEqual({ message: 'Access denied' });
  });

  it('should return 401 if pass is invalid', async () => {
    const mockRes = mockResGenerator();

    auth.mockReturnValueOnce({
      name: 'jake',
      pass: 'password',
    });
    compare.mockReturnValueOnce(true);
    compare.mockReturnValueOnce(false);

    const response = await registerNewUser({}, mockRes());
    expect(response.status).toEqual(401);
    expect(response.response).toEqual({ message: 'Access denied' });
  });

  it('should return 200 + data if credentials are correct', async () => {
    const mockRes = mockResGenerator();

    auth.mockReturnValueOnce({
      name: 'jake',
      pass: 'password',
    });
    compare.mockReturnValueOnce(true);
    compare.mockReturnValueOnce(true);
    register.mockResolvedValueOnce([1]);

    const response = await registerNewUser({}, mockRes());
    expect(response.status).toEqual(200);
    expect(response.response).toEqual({ onbcId: 1 });
  });

  it('should return 500 if db call fails', async () => {
    const mockRes = mockResGenerator();

    auth.mockReturnValueOnce({
      name: 'jake',
      pass: 'password',
    });
    compare.mockReturnValueOnce(true);
    compare.mockReturnValueOnce(true);
    register.mockRejectedValueOnce({ message: 'db call failed' });

    const response = await registerNewUser({}, mockRes());
    expect(response.status).toEqual(500);
    expect(response.response).toEqual({ error: { message: 'db call failed' } });
  });
});
