import { connect } from 'react-redux';

import AppSwitcher from './components/AppSwitcher';
import { actions } from './reducer';

export default connect(
  state => ({
    showGoBackToClassic: state.appSwitcher.showGoBackToClassic,
    submittingFeedback: state.appSwitcher.submittingFeedback,
    redirecting: state.appSwitcher.redirecting,
  }),
  dispatch => ({
    sendFeedback(feedback) {
      dispatch(actions.sendFeedback(feedback));
    },
  }),
)(AppSwitcher);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
