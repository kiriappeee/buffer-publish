import deepFreeze from 'deep-freeze';
// import { actionTypes as asyncDataFetchActions } from '@bufferapp/async-data-fetch';
import reducer, { actionTypes } from './reducer';

describe('reducer', () => {
  it('should initialize default state', () => {
    const stateAfter = {
      showModalAppId: null,
      showModalAppName: '',
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
    };
    const action = {
      type: actionTypes.REQUEST_CLOSE_MODAL,
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });
});
