import { actions as fetchActions } from '@bufferapp/async-data-fetch';
import { constants as tabsNames } from '@bufferapp/publish-preferences';
import { LOCATION_CHANGE } from 'react-router-redux';
import middleware from './middleware';

describe('middleware', () => {
  const RPC_NAME = 'connectedApps';
  const next = jest.fn();
  const dispatch = jest.fn();
  const store = {
    dispatch,
  };
  it('should call connectedApps when location change to apps and extras', () => {
    jest.resetAllMocks();
    const action = {
      type: LOCATION_CHANGE,
      payload: {
        pathname: `/preferences/${tabsNames.APPS_EXTRAS}`,
      },
    };
    middleware(store)(next)(action);
    expect(dispatch).toHaveBeenCalledWith(fetchActions.fetch({
      name: RPC_NAME,
    }));
  });

  it('should not call connectedApps when location change to another path', () => {
    jest.resetAllMocks();
    const action = {
      type: LOCATION_CHANGE,
      payload: {
        pathname: '/preferences/test',
      },
    };
    middleware(store)(next)(action);
    expect(dispatch).not.toHaveBeenCalledWith(fetchActions.fetch({
      name: RPC_NAME,
    }));
  });

  it('always propagates the action', () => {
    const action = {};
    middleware(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });
});
