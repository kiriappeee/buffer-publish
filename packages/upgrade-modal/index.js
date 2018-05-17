import { connect } from 'react-redux';

import UpgradeModal from './components/UpgradeModal';

export default connect(
  state => ({
    cycle: state.upgradeModal.cycle,
    translations: state.i18n.translations['upgrade-modal'],
  }),
)(UpgradeModal);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
