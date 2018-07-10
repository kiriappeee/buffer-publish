import deepFreeze from 'deep-freeze';
import reducer, { actions, actionTypes } from './reducer';

describe('reducer', () => {
  it('should initialize default state', () => {
    const stateAfter = {
      showModalAppId: null,
      showModalAppName: '',
      connectedApps: [],
    };
    const action = {
      type: 'INIT',
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  it('should handle REQUEST OPEN MODAL action type', () => {
    const stateAfter = {
      showModalAppId: 1,
      showModalAppName: 'App 1',
      connectedApps: [],
    };
    const action = {
      type: actionTypes.REQUEST_OPEN_MODAL,
      appId: 1,
      appName: 'App 1',
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  it('should handle REQUEST CLOSE MODAL action type', () => {
    const stateAfter = {
      showModalAppId: null,
      showModalAppName: '',
      connectedApps: [],
    };
    const action = {
      type: actionTypes.REQUEST_CLOSE_MODAL,
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  it('should handle connectedApps_FETCH_SUCCESS action type', () => {
    const app1 = {
      id: 'id1',
      name: 'app1',
    };

    const stateAfter = {
      showModalAppId: null,
      showModalAppName: '',
      connectedApps: [app1],
    };

    const action = {
      type: 'connectedApps_FETCH_SUCCESS',
      result: [app1],
    };

    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });
});

describe('actions', () => {
  it('requestOpenModal triggers a REQUEST_OPEN_MODAL action', () => {
    const appId = 'app1';
    const appName = 'App one';
    expect(actions.requestOpenModal({ appId, appName })).toEqual({
      type: actionTypes.REQUEST_OPEN_MODAL,
      appId,
      appName,
    });
  });
  it('requestCloseModal triggers a REQUEST_CLOSE_MODAL action', () => {
    expect(actions.requestCloseModal()).toEqual({
      type: actionTypes.REQUEST_CLOSE_MODAL,
    });
  });
});

