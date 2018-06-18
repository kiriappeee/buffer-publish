/* eslint-disable import/first */

jest.mock('micro-rpc-client');
jest.mock('request-promise');
import rp from 'request-promise';
import updateEmail from './';

describe('rpc/updateEmail', () => {
  it('should have the expected name', () => {
    expect(updateEmail.name)
      .toBe('updateEmail');
  });

  it('should have the expected docs', () => {
    expect(updateEmail.docs)
      .toBe('update the user email');
  });

  it('should send a POST request to /user/update.json with the new email', async () => {
    const email = 'hello@bufferapp.com';
    rp.mockReturnValueOnce(Promise.resolve({
      removed: true,
    }));

    await updateEmail.fn({ email }, {
      session: {
        publish: {
          accessToken: 'access-token!',
        },
      },
    });

    expect(rp.mock.calls[0]).toEqual([{
      uri: `${process.env.API_ADDR}/1/user/update.json`,
      method: 'POST',
      strictSSL: !(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'),
      json: true,
      form: {
        email,
        access_token: 'access-token!',
      },
    }]);
  });
});
