import {
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';

export const actionTypes = {};

const initialState = {
  loading: true,
  features: [],
  product: 'free',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `feature_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        loading: true,
      };
    case `feature_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        loading: false,
        features: action.result.features,
        planName: action.result.planName,
      };
    default:
      return state;
  }
};

export const actions = {};
