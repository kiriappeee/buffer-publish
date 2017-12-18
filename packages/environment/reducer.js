import {
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';

const initialState = {
  environment: 'production',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `environment_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        environment: action.result.environment,
      };
    default:
      return state;
  }
};
