/* global Stripe */

import { actions as notification } from '@bufferapp/notifications';
import middleware from './middleware';
import { actions, actionTypes } from './reducer';
import { CREDIT_CARD, SUCCESS_RESPONSE, ERROR_RESPONSE, CARD_WITHOUT_NAME_RESPONSE, CARD_WITHOUT_ZIP_RESPONSE, CARD_WITH_WRONG_ZIP_RESPONSE } from './test/constants';

global.Stripe = {
  createToken: jest.fn(),
};

const i18n = {
  stripe: {
    noNameError: 'no name',
    invalidZipError: 'invalid zip',
    noZipError: 'zip code missing',
  },
};

describe('middleware', () => {
  const next = jest.fn();
  const store = {
    dispatch: jest.fn(),
    getState: () => ({
      i18n,
    }),
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
      expect(store.dispatch)
        .toHaveBeenCalledWith(actions.approveCreditCard(SUCCESS_RESPONSE.id));
      done();
    };
    validateCreditCard();
  });

  describe('error handling', () => {
    it('should trigger a throwValidationError action if response has an error message', (done) => {
      global.Stripe.createToken = (card, cb) => {
        cb(null, ERROR_RESPONSE);
        expect(store.dispatch)
          .toHaveBeenCalledWith(actions.throwValidationError(ERROR_RESPONSE.error.message));
        done();
      };
      validateCreditCard();
    });
    it('should throw an error if the card does not have a name', (done) => {
      global.Stripe.createToken = (card, cb) => {
        cb(null, CARD_WITHOUT_NAME_RESPONSE);
        expect(store.dispatch)
          .toHaveBeenCalledWith(actions.throwValidationError(i18n.stripe.noNameError));
        done();
      };
      validateCreditCard();
    });

    it('creates an error notification for the user to know', (done) => {
      global.Stripe.createToken = (card, cb) => {
        cb(null, CARD_WITHOUT_NAME_RESPONSE);
        expect(store.dispatch)
          .toHaveBeenCalledWith(expect.objectContaining({
            notificationType: 'error',
            message: i18n.stripe.noNameError,
          }));
        done();
      };
      validateCreditCard();
    });

    describe('US cards address checks', () => {
      it('throws an error if there is no zip code', (done) => {
        global.Stripe.createToken = (card, cb) => {
          cb(null, CARD_WITHOUT_ZIP_RESPONSE);
          expect(store.dispatch)
            .toHaveBeenCalledWith(actions.throwValidationError(i18n.stripe.noZipError));
          done();
        };
        validateCreditCard();
      });

      it('throws an error if the zip code does not match with the bank\'s one', (done) => {
        global.Stripe.createToken = (card, cb) => {
          cb(null, CARD_WITH_WRONG_ZIP_RESPONSE);
          expect(store.dispatch)
            .toHaveBeenCalledWith(actions.throwValidationError(i18n.stripe.invalidZipError));
          done();
        };
        validateCreditCard();
      });
    });
  });
});
