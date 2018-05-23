/* eslint-disable import/first */
jest.mock('micro-rpc-client');
jest.mock('request-promise');
import rp from 'request-promise';
import upgradeToPro from './';

const accessToken = 'AN ACCESS TOKEN';
const session = {
  publish: {
    accessToken,
  },
};
describe('rpc/upgradeToPro', () => {
  beforeEach(async () => {
    rp.mockReturnValueOnce(Promise.resolve('{}'));
    await upgradeToPro.fn({
      cycle: 'year',
      token: 'stripe token',
    }, {
      session,
    });
  });
  it('sends over a request to Buffer\'s API with Publish\'s access token', () => {
    expect(rp.mock.calls[0][0].body.access_token).toBe(accessToken);
  });

  it('sends over the selected cycle and current stripe token', () => {
    expect(rp.mock.calls[0][0].body.cycle).toBe('year');
    expect(rp.mock.calls[0][0].body.stripeToken).toBe('stripe token');
  });
});
