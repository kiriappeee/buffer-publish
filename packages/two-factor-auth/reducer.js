import {
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';

import { handleTransition } from './machine';

export const initialState = {
  machineState: 'disabled',
  isEnabled: false,
  editMode: false,
  method: false,
  phoneNumber: '',
  confirmationCode: '',
  recoveryCode: null,
};

export const actionTypes = {
  TRANSITION: 'TRANSITION',
  SET_PHONE_NUMBER: 'SET_PHONE_NUMBER',
  SUBMIT_PHONE_NUMBER: 'SUBMIT_PHONE_NUMBER',
};

export const actions = {
  transition: (name, params) => ({
    type: actionTypes.TRANSITION,
    name,
    params,
  }),
  setPhoneNumber: value => ({
    type: actionTypes.SET_PHONE_NUMBER,
    value,
  }),
  submitPhoneNumber: () => ({
    type: actionTypes.SUBMIT_PHONE_NUMBER,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TRANSITION: {
      const { name, params } = action;
      return handleTransition({
        state,
        name,
        params,
      });
    }
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const twofactor = action.result.twofactor;
      return {
        ...state,
        machineState: twofactor ? 'enabled' : 'disabled',
        isEnabled: !!twofactor,
        method: twofactor ? twofactor.type : false,
        phoneNumber: twofactor ? twofactor.tel : '',
      };
    }
    case actionTypes.SET_PHONE_NUMBER: {
      return {
        ...state,
        phoneNumber: action.value,
      };
    }
    default:
      return state;
  }
};

export default reducer;
