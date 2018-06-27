import { handleTransition } from './machine';

export const initialState = {
  machineState: 'disabled',
  isEnabled: false,
  editMode: false,
  type: 'SMS',
  phoneNumber: '',
  confirmationCode: null,
  recoveryCode: null,
};

export const actionTypes = {
  TRANSITION: 'TRANSITION',
  SET_PHONE_NUMBER: 'SET_PHONE_NUMBER',
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
