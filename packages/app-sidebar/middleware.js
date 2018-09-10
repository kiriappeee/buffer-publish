import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';

export default ({ dispatch }) => next => (action) => {
  next(action);
  switch (action.type) {
    case 'APP_INIT':
      dispatch(dataFetchActions.fetch({
        name: 'user',
      }));
      break;
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`:
      if (window && window.FS && window.FS.identify) {
        window.FS.identify(action.result.id, {
          email: action.result.email,
        });
      }
      break;
    default:
      break;
  }
};
