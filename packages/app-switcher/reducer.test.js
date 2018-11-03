import {
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import deepFreeze from 'deep-freeze';
import reducer, { initialState } from './reducer';

describe('reducer', () => {
  describe('actions', () => {
    it('should initialize default state', () => {
      const action = {
        type: 'INIT',
      };
      deepFreeze(action);
      expect(reducer(undefined, action))
        .toEqual(initialState);
    });

    it('sets showGoBackToClassic to true when the user is on new publish beta', () => {
      const features = ['new_publish_beta', 'new_publish_beta_redirect'];
      const stateAfter = {
        ...initialState,
        showGoBackToClassic: true,
        user: {
          loading: false,
          features,
        },
      };

      const action = {
        type: `user_${dataFetchActionTypes.FETCH_SUCCESS}`,
        result: {
          features,
        },
      };

      deepFreeze(action);
      expect(reducer(undefined, action))
        .toEqual(stateAfter);
    });

    it('sets submittingFeedback to true on FETCH_START', () => {
      const stateAfter = {
        ...initialState,
        submittingFeedback: true,
      };

      const action = {
        type: `sendFeedback_${dataFetchActionTypes.FETCH_START}`,
      };

      deepFreeze(action);
      expect(reducer(undefined, action))
        .toEqual(stateAfter);
    });

    it('sets submittingFeedback to false and redirecting to true on FETCH_SUCCESS', () => {
      const stateAfter = {
        ...initialState,
        submittingFeedback: false,
        redirecting: true,
      };

      const action = {
        type: `sendFeedback_${dataFetchActionTypes.FETCH_SUCCESS}`,
      };

      deepFreeze(action);
      expect(reducer(undefined, action))
        .toEqual(stateAfter);
    });

    it('sets submittingFeedback to false on FETCH_FAIL', () => {
      const stateAfter = {
        ...initialState,
        submittingFeedback: false,
      };

      const action = {
        type: `sendFeedback_${dataFetchActionTypes.FETCH_FAIL}`,
      };

      deepFreeze(action);
      expect(reducer(undefined, action))
        .toEqual(stateAfter);
    });
  });
});
