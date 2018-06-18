import { actions } from './reducer';

export default ({ dispatch }) => next => (action) => {
  next(action);
  switch (action.type) {
    case 'APP_INIT':
      if (window.location.hash === '#upgrade-to-pro') {
        dispatch(actions.showUpgradeModal());
      }
      break;
    case 'COMPOSER_EVENT':
      if (action.eventType === 'show-upgrade-modal') {
        dispatch(actions.showUpgradeModal());
      }
      break;
    default:
      break;
  }
};
