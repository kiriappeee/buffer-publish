import reducer, { actions } from './reducer';

import { CREDIT_CARD, TOKEN } from './test/constants';

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

  describe('throwValidationError', () => {
    beforeEach(() => {
      const validatingState = reducer(undefined, actions.validateCreditCard(CREDIT_CARD));
      state = reducer(validatingState, actions.throwValidationError('credit card expired!'));
    });

    it('sets validating back to false', () => expect(state.validating).toBeFalsy());
    it('stores error message', () => expect(state.error).toBe('credit card expired!'));
  });

  describe('approveCreditCard', () => {
    beforeEach(() => {
      const validatingState = reducer(undefined, actions.validateCreditCard(CREDIT_CARD));
      state = reducer(validatingState, actions.approveCreditCard(TOKEN));
    });

    it('sets validating back to false', () => expect(state.validating).toBeFalsy());
    it('stores the token', () => expect(state.token).toBe(TOKEN));
  });

  describe('changing billing cyles', () => {
    it('setMonthlyCycle sets the cycle to "month"', () => {
      state = reducer(undefined, actions.setMonthlyCycle());
      expect(state.cycle).toBe('month');
    });

    it('setYearlyCycle sets the cycle to "year"', () => {
      state = reducer(undefined, actions.setYearlyCycle());
      expect(state.cycle).toBe('year');
    });
  });
});
