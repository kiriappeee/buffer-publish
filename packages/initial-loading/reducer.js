import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('INITIAL_LOADING', [
  'PROFILE_LOADING_REDIRECT',
]);

export const actions = {
  profileLoadingRedirect: () => ({
    type: actionTypes.PROFILE_LOADING_REDIRECT,
  }),
};
