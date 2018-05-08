/* global Stripe */

import middleware from './middleware';
import { actions, actionTypes } from './reducer';

global.Stripe = {
  createToken: jest.fn(),
};

const CREDIT_CARD = '4242424242424242';
const TOKEN = 'tok_visa';
const SUCCESS_RESPONSE = {
  id: TOKEN,
};


describe('middleware', () => {
  const next = jest.fn();
  const store = {
    dispatch: jest.fn(),
  };
  const validateCreditCard = () => {
    const action = {
      type: actionTypes.CREDIT_CARD_VALIDATING,
      card: CREDIT_CARD,
    };
    middleware(store)(next)(action);
  };

  it('always calls next()', () => {
    const action = {
      type: 'TEST',
    };
    middleware(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should create a new Stripe token on CREDIT_CARD_VALIDATING', () => {
    validateCreditCard();
    expect(Stripe.createToken).toHaveBeenCalledWith(CREDIT_CARD, expect.any(Function));
  });

  it('should trigger an approveCreditCard action on success', (done) => {
    global.Stripe.createToken = (card, cb) => {
      cb(null, SUCCESS_RESPONSE);
      expect(store.dispatch).toHaveBeenCalledWith(actions.approveCreditCard(TOKEN));
      done();
    };
    validateCreditCard();
  });
});
