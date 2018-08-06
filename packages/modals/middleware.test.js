import middleware from './middleware';
import { actions } from './reducer';

// Object.defineProperty(window.location, 'hash', {
//   writable: true,
//   value: '#upgrade-to-pro',
// });

describe('middleware', () => {
  it('should show modal on APP_INIT when hash is present', () => {
    history.replaceState(undefined, undefined, '#upgrade-to-pro');
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: 'APP_INIT',
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(actions.showUpgradeModal());
  });
  it('should show upgrade modal when triggered from composer', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: 'COMPOSER_EVENT',
      eventType: 'show-upgrade-modal',
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(actions.showUpgradeModal());
  });
});
