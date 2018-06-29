import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

import { handleTransition } from './machine';

export const initialState = {
  machineState: 'disabled',
  isEnabled: false,
  editMode: false,
  method: false,
  phoneNumber: '',
  confirmationCode: '',
  recoveryCode: null,
  loading: false,
  error: '',
  initKey: '',
  qrCode: '',
  updateMethod: false,
};

export const actionTypes = {
  TRANSITION: 'TRANSITION',
  SET_PHONE_NUMBER: 'SET_PHONE_NUMBER',
  SUBMIT_PHONE_NUMBER: 'SUBMIT_PHONE_NUMBER',
  SETUP_APP: 'SETUP_APP',
  SUBMIT_CODE: 'SUBMIT_CODE',
  RECOVERY_CODE_SELECTED: 'RECOVERY_CODE_SELECTED',
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
  setupApp: () => ({
    type: actionTypes.SETUP_APP,
  }),
  submitCode: code => ({
    type: actionTypes.SUBMIT_CODE,
    code,
  }),
  recoveryCodeSelected: () => ({
    type: actionTypes.RECOVERY_CODE_SELECTED,
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
    case actionTypes.SET_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.value,
      };
    case `twoFactorUpdate_${dataFetchActionTypes.FETCH_START}`:
    case `twoFactorConfirm_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case `twoFactorUpdate_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        initKey: action.result.init_key,
        qrCode: action.result.qr_code,
        loading: false,
        error: '',
      };
    case `twoFactorConfirm_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        recoveryCode: action.result.recovery,
        loading: false,
        error: '',
      };
    case `twoFactorUpdate_${dataFetchActionTypes.FETCH_FAIL}`:
    case `twoFactorConfirm_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        loading: false,
        error: action.result ? action.result.error : action.error,
      };
    default:
      return state;
  }
};

export default reducer;
