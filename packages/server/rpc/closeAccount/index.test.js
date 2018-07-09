/* eslint-disable import/first */

jest.mock('micro-rpc-client');
jest.mock('request-promise');
import rp from 'request-promise';
import closeAccount from './';

describe('rpc/closeAccount', () => {
  it('should have the expected name', () => {
    expect(closeAccount.name).toBe('closeAccount');
  });

  it('should have the expected docs', () => {
    expect(closeAccount.docs).toBe('delete the user account');
  });

  it('should send a POST request to /user/delete.json', async () => {
    rp.mockReturnValueOnce(
      Promise.resolve({
        removed: true,
      }),
    );

    await closeAccount.fn(
      {},
      {
        session: {
          publish: {
            accessToken: 'access-token!',
          },
        },
      },
    );

    expect(rp.mock.calls[0]).toEqual([
      {
        uri: `${process.env.API_ADDR}/1/user/delete.json`,
        method: 'POST',
        strictSSL: !(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'),
        json: true,
        form: {
          access_token: 'access-token!',
        },
      },
    ]);
  });
});
