// import { actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('MANAGE_APPS', {
  REQUEST_OPEN_MODAL: 0,
  REQUEST_CLOSE_MODAL: 0,
});

const initialState = {
  showModalAppId: null,
  showModalAppName: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_OPEN_MODAL:
      return {
        showModalAppId: action.appId,
        showModalAppName: action.appName,
      };
    case actionTypes.REQUEST_CLOSE_MODAL:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const actions = {
  requestOpenModal: ({ appId, appName }) => ({
    type: actionTypes.REQUEST_OPEN_MODAL,
    appId,
    appName,
  }),
  requestCloseModal: () => ({
    type: actionTypes.REQUEST_CLOSE_MODAL,
  }),
};
