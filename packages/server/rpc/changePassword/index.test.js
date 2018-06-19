/* eslint-disable import/first */

jest.mock('micro-rpc-client');
jest.mock('request-promise');
import rp from 'request-promise';
import changePassword from './';

describe('rpc/changePassword', () => {
  it('should have the expected name', () => {
    expect(changePassword.name).toBe('changePassword');
  });

  it('should have the expected docs', () => {
    expect(changePassword.docs).toBe('change the user password');
  });

  it('should send a POST request to /user/update.json with the new email', async () => {
    const password = 'password';
    const newPassword = 'newPassword';
    rp.mockReturnValueOnce(
      Promise.resolve({
        removed: true,
      }),
    );

    await changePassword.fn(
      { password, newPassword },
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
        uri: `${process.env.API_ADDR}/1/user/update.json`,
        method: 'POST',
        strictSSL: !(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'),
        json: true,
        form: {
          old_password: password,
          password: newPassword,
          access_token: 'access-token!',
        },
      },
    ]);
  });
});
