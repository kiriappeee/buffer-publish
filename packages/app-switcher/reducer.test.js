import {
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import deepFreeze from 'deep-freeze';
import reducer from './reducer';

describe('reducer', () => {
  describe('actions', () => {
    it('should initialize default state', () => {
      const stateAfter = {
        redirecting: false,
        showGoBackToClassic: false,
        submittingFeedback: false,
        user: {
          loading: true,
        },
      };
      const action = {
        type: 'INIT',
      };
      deepFreeze(action);
      expect(reducer(undefined, action))
        .toEqual(stateAfter);
    });

    it('user_fetchSuccess triggers a FETCH_SUCCESS action', () => {
      const redirecting = false;
      const showGoBackToClassic = true;
      const submittingFeedback = false;
      const loading = false;
      const result = { features: ['...'] };

      const action = {
        type: `user_${dataFetchActionTypes.FETCH_SUCCESS}`,
        redirecting,
        showGoBackToClassic,
        submittingFeedback,
        user: { loading },
        result,
      };
      const stateAfter = { redirecting, showGoBackToClassic, submittingFeedback, user: { loading, features: ['...'] } };
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
