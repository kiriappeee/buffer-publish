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

    it('sendFeedback_fetchStart triggers a FETCH_START action', () => {
      const submittingFeedback = true;
      const redirecting = false;
      const showGoBackToClassic = false;
      const loading = true;
      const result = { features: ['...'] };

      const action = {
        type: `sendFeedback_${dataFetchActionTypes.FETCH_START}`,
        redirecting,
        showGoBackToClassic,
        submittingFeedback,
        user: { loading },
        result,
      };
      const stateAfter = { redirecting, showGoBackToClassic, submittingFeedback, user: { loading } };
      deepFreeze(action);
      expect(reducer(undefined, action))
        .toEqual(stateAfter);
    });

    it('sendFeedback_fetchSuccess triggers a FETCH_SUCCESS action', () => {
      const submittingFeedback = false;
      const redirecting = true;
      const showGoBackToClassic = false;
      const loading = true;
      const result = { features: ['...'] };

      const action = {
        type: `sendFeedback_${dataFetchActionTypes.FETCH_SUCCESS}`,
        redirecting,
        showGoBackToClassic,
        submittingFeedback,
        user: { loading },
        result,
      };

      const stateAfter = { redirecting, showGoBackToClassic, submittingFeedback, user: { loading } };
      deepFreeze(action);
      expect(reducer(undefined, action))
        .toEqual(stateAfter);
    });

    it('sendFeedback_fetchFail triggers a FETCH_FAIL action', () => {
      const submittingFeedback = false;
      const redirecting = false;
      const showGoBackToClassic = false;
      const loading = true;
      const result = { features: ['...'] };

      const action = {
        type: `sendFeedback_${dataFetchActionTypes.FETCH_FAIL}`,
        redirecting,
        showGoBackToClassic,
        submittingFeedback,
        user: { loading },
        result,
      };

      const stateAfter = { redirecting, showGoBackToClassic, submittingFeedback, user: { loading } };
      deepFreeze(action);
      expect(reducer(undefined, action))
        .toEqual(stateAfter);
    });
  });
});
