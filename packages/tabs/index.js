import { push } from 'react-router-redux';
import { generateProfilePageRoute, generateChildTabRoute } from '@bufferapp/publish-routes';
import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';

import TabNavigation from './components/TabNavigation';


// default export = container
export default connect(
  (state, ownProps) => ({
    isBusinessAccount: state.profileSidebar.selectedProfile.business,
    isManager: state.profileSidebar.selectedProfile.isManager,
    selectedTabId: ownProps.tabId,
    selectedChildTabId: ownProps.childTabId,
    shouldShowUpgradeCta: state.appSidebar.user.is_free_user,
    hasDraftsFeatureFlip: state.appSidebar.user.features ? state.appSidebar.user.features.includes('drafts_new_publish') : false,
    shouldShowNestedSettingsTab: ownProps.tabId === "settings",
    // This should be removed once the general settings tab is complete - Lola Oct/2018
    showGeneralSettings: state.profileSidebar.selectedProfile.type === "instagram",
  }),
  (dispatch, ownProps) => ({
    onTabClick: tabId => dispatch(push(generateProfilePageRoute({
      tabId,
      profileId: ownProps.profileId,
    }))),
    showUpgradeModal: () => dispatch(modalsActions.showUpgradeModal()),
    onChildTabClick: childTabId => dispatch(push(generateChildTabRoute({
      tabId: ownProps.tabId,
      childTabId,
      profileId: ownProps.profileId,
    }))),
  }),
)(TabNavigation);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
