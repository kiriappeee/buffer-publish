import { connect } from "react-redux";
import { actions } from './reducer';

import DefaultPage from './components/DefaultPage';

export default connect(
  (state, ownProps) => ({
    translations: state.i18n.translations['default-page'],
  }),
  (dispatch, ownProps) => ({
    onConnectSocialAccountClick: () => {
      dispatch(actions.handleConnectSocialAccountClick());
    },
  }),
)(DefaultPage);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
