import { handleTransition } from "./machine";

export const initialState = {
  machineState: "disabled",
  isEnabled: false,
  editMode: false,
  type: "SMS",
  phoneAreaCode: null,
  phoneNumber: null,
  confirmationCode: null,
  recoveryCode: null
};

export const actionTypes = {
  TRANSITION: "TRANSITION"
};

export const actions = {
  transition: (name, params) => ({
    type: actionTypes.TRANSITION,
    name,
    params
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TRANSITION: {
      const { name, params } = action;
      return handleTransition({
        state,
        name,
        params
      });
    }
    default:
      return state;
  }
};

export default reducer;
