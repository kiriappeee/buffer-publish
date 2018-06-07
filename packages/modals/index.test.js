import {
  reducer,
  actions,
  actionTypes,
  initialState,
} from './index';

describe('Modals', () => {
  it('should export initialState', () => {
    expect(initialState)
      .toBeDefined();
  });

  it('should export reducer', () => {
    expect(reducer)
      .toBeDefined();
  });

  it('should export actions', () => {
    expect(actions)
      .toBeDefined();
  });

  it('should export actionTypes', () => {
    expect(actionTypes)
      .toBeDefined();
  });
});

describe('reducer', () => {
  it('should return initial state', () => {
    const action = { type: 'INIT' };
    expect(reducer(undefined, action))
      .toEqual(initialState);
  });

  describe('actions', () => {
    it('should show upgrade modal', () => {
      expect(reducer(initialState, actions.showUpgradeModal()))
        .toEqual(Object.assign(initialState, { showUpgradeModal: true }));
    });
    it('should hide upgrade modal', () => {
      const stateWithVisibleModal = Object.assign(
        initialState,
        { showUpgradeModal: true },
      );
      expect(reducer(stateWithVisibleModal, actions.hideUpgradeModal()))
        .toEqual(Object.assign(initialState, { showUpgradeModal: false }));
    });
  });
});
