import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('INITIAL_LOADING', [
  'PROFILE_LOADING_REDIRECT',
]);

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const actions = {
  profileLoadingRedirect: () => ({
    type: actionTypes.PROFILE_LOADING_REDIRECT,
  }),
};
