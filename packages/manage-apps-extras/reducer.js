// import { actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('MANAGE_APPS', {
  REQUEST_OPEN_MODAL: 0,
  REQUEST_CLOSE_MODAL: 0,
});

const initialState = {
  showModalAppId: null,
  showModalAppName: '',
  connectedApps: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `connectedApps_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      return {
        ...state,
        connectedApps: action.result,
      };
    }
    case actionTypes.REQUEST_OPEN_MODAL:
      return {
        ...state,
        showModalAppId: action.appId,
        showModalAppName: action.appName,
      };
    case actionTypes.REQUEST_CLOSE_MODAL:
      return {
        ...state,
        showModalAppId: null,
        showModalAppName: '',
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
