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
    /**
     * Handle transitions with our state machine (see machine.js)
     */
    case actionTypes.TRANSITION: {
      const { name, params } = action;
      return handleTransition({
        state,
        name,
        params,
      });
    }
    /**
     * This is the initial user data that comes in, we
     * pull out the relevant twofactor details if present.
     */
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
    /**
     * Handle loading states
     */
    case `twoFactorUpdate_${dataFetchActionTypes.FETCH_START}`:
    case `twoFactorConfirm_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        loading: true,
        error: '',
      };
    /**
     * This happens when
     *   a) the user enters a phone number and clicks 'next'
     *   b) the user chooses 'authenticator app'
     *   c) the user disables TFA with the toggle switch
     */
    case `twoFactorUpdate_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const turnedOff = action.args.tfaMethod === 'off';
      return {
        ...state,
        initKey: turnedOff ? state.initKey : action.result.init_key,
        qrCode: turnedOff ? state.qrCode : action.result.qr_code,
        loading: false,
        error: '',
      };
    }
    /**
     * This happens after they've confirmed the code from SMS or App
     */
    case `twoFactorConfirm_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        recoveryCode: action.result.recovery,
        loading: false,
        error: '',
      };
    /**
     * In case something goes wrong...
     */
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
