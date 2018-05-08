import reducer, { actions } from './reducer';

const CREDIT_CARD = '4242424242424242';

describe('reducer', () => {
  let state = {};
  describe('initial state', () => {
    beforeEach(() => {
      state = reducer(undefined, {
        type: 'TEST',
      });
    });

    it('has no error', () => expect(state.error).toBeNull());
    it('has no card information', () => expect(state.card).toBeNull());
    it('has no token', () => expect(state.token).toBeNull());
    it('is not validating', () => expect(state.validating).toBeFalsy());
  });

  describe('validateCreditCard', () => {
    beforeEach(() => {
      state = reducer(undefined, actions.validateCreditCard(CREDIT_CARD));
    });

    it('sets the state to validating', () => expect(state.validating).toBeTruthy());
    it('stores the card', () => expect(state.card).toBe(CREDIT_CARD));
  });
});
