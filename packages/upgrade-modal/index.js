import { connect } from 'react-redux';
import { actions as queueActions } from '@bufferapp/publish-queue';

import UpgradeModal from './components/UpgradeModal';
import { actions } from './reducer';

export default connect(
  state => ({
    cycle: state.upgradeModal.cycle,
    translations: state.i18n.translations['upgrade-modal'],
    validating: state.stripe.validating,
  }),
  dispatch => ({
    storeValue: (id, value) => dispatch(actions.storeValue(id, value)),
    upgradePlan: () => dispatch(actions.upgrade()),
    selectCycle: cycle => dispatch(actions.selectCycle(cycle)),
    hideModal: () => dispatch(queueActions.hideUpgradeModal()),
  }),
)(UpgradeModal);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
