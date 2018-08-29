import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('DEFAULT_PAGE', {
  CONNECT_SOCIAL_ACCOUNT: 0,
});

// export default (state = {}, action) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };

export const actions = {
  handleConnectSocialAccountClick: () => ({
    type: actionTypes.CONNECT_SOCIAL_ACCOUNT,
  }),
};
