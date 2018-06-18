import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('EDIT_EMAIL', {
  SHOW_MODAL: 0,
  HIDE_MODAL: 0,
  UPDATE_EMAIL: 0,
  SAVE_EMAIL: 0,
});

const initialState = {
  displayModal: false,
  newEmail: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HIDE_MODAL:
      return {
        ...state,
        displayModal: false,
      };
    case actionTypes.UPDATE_EMAIL:
      return {
        ...state,
        newEmail: action.newEmail,
      };
    case actionTypes.SHOW_MODAL:
      return {
        ...state,
        displayModal: true,
      };
    default:
      return state;
  }
};

export const actions = {
  showModal: () => ({
    type: actionTypes.SHOW_MODAL,
  }),
  hideModal: () => ({
    type: actionTypes.HIDE_MODAL,
  }),
  saveEmail: () => ({
    type: actionTypes.SAVE_EMAIL,
  }),
  updateEmail: newEmail => ({
    type: actionTypes.UPDATE_EMAIL,
    newEmail,
  }),
};
