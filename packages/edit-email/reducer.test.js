import reducer, { actions, actionTypes } from './reducer';

describe('reducer', () => {
  describe('modal', () => {
    it('is hidden initially', () => {
      const initialState = reducer(undefined, {});
      expect(initialState.displayModal).toBeFalsy();
    });

    it('is displayed after showModal is triggered', () => {
      const state = reducer(undefined, actions.showModal());
      expect(state.displayModal).toBeTruthy();
    });

    it('is hidden again after hideModal is triggered', () => {
      const showModalState = reducer(undefined, actions.showModal());
      const state = reducer(showModalState, actions.hideModal());
      expect(state.displayModal).toBeFalsy();
    });
  });
});

describe('actions', () => {
  it('showModal triggers a SHOW_MODAL action', () => {
    expect(actions.showModal()).toEqual({
      type: actionTypes.SHOW_MODAL,
    });
  });
  it('hideModal triggers a HIDE_MODAL action', () => {
    expect(actions.hideModal()).toEqual({
      type: actionTypes.HIDE_MODAL,
    });
  });
  it('updateEmail triggers an UPDATE_EMAIL action', () => {
    expect(actions.updateEmail('hello@bufferapp.com')).toEqual({
      type: actionTypes.UPDATE_EMAIL,
      newEmail: 'hello@bufferapp.com',
    });
  });
});
