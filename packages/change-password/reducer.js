import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('CHANGE_PASSWORD', {
  REQUEST_OPEN_MODAL: 0,
  REQUEST_CLOSE_MODAL: 0,
});

const initialState = {
  showModal: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_OPEN_MODAL:
      return {
        ...state,
        showModal: true,
      };
    case actionTypes.REQUEST_CLOSE_MODAL:
      return {
        ...state,
        showModal: false,
      };
    default:
      return state;
  }
};

export const actions = {
  requestOpenModal: () => ({
    type: actionTypes.REQUEST_OPEN_MODAL,
  }),
  requestCloseModal: () => ({
    type: actionTypes.REQUEST_CLOSE_MODAL,
  }),
};
