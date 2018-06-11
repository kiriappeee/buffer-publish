import { connect } from 'react-redux';
import keyWrapper from '@bufferapp/keywrapper';
import AppModals from './components/AppModals';

export const initialState = {
  showUpgradeModal: false,
};

export const actionTypes = keyWrapper('MODALS', {
  SHOW_UPGRADE_MODAL: 0,
  HIDE_UPGRADE_MODAL: 0,
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_UPGRADE_MODAL:
      return {
        ...state,
        showUpgradeModal: true,
      };
    case actionTypes.HIDE_UPGRADE_MODAL:
      return {
        ...state,
        showUpgradeModal: false,
      };
    case 'COMPOSER_EVENT':
      if (action.eventType === 'show-upgrade-modal') {
        return {
          ...state,
          showUpgradeModal: true,
        };
      }
      return state;
    default:
      return state;
  }
};

export const actions = {
  showUpgradeModal: () => ({
    type: actionTypes.SHOW_UPGRADE_MODAL,
  }),
  hideUpgradeModal: () => ({
    type: actionTypes.HIDE_UPGRADE_MODAL,
  }),
};

const mapStateToProps = state => state.modals;
export default connect(mapStateToProps)(AppModals);
