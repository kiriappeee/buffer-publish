import { push } from 'react-router-redux';
import { generateProfilePageRoute } from '@bufferapp/publish-routes';
import { connect } from 'react-redux';
import { actions as queueActions } from '@bufferapp/publish-queue';

import TabNavigation from './components/TabNavigation';


// default export = container
export default connect(
  (state, ownProps) => ({
    selectedTabId: ownProps.tabId,
    shouldShowUpgradeCta: state.appSidebar.user.is_free_user,
  }),
  (dispatch, ownProps) => ({
    onTabClick: tabId => dispatch(push(generateProfilePageRoute({
      tabId,
      profileId: ownProps.profileId,
    }))),
    showUpgradeModal: () => dispatch(queueActions.showUpgradeModal()),
  }),
)(TabNavigation);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
