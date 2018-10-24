import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
  getPreferencePageParams,
  generatePreferencePageRoute,
  generateProfilePageRoute,
} from '@bufferapp/publish-routes';
import { actions as profileSidebarActions } from '@bufferapp/publish-profile-sidebar';
import Preferences from './components/Preferences';

export default connect(
  (state, ownProps) => {
    const { preferenceId } =
      getPreferencePageParams({ path: ownProps.history.location.pathname }) || {};
    return {
      profiles: state.profileSidebar.profiles,
      selectedTabId: preferenceId,
      selectedProfileId: state.profileSidebar.selectedProfileId,
    };
  },
  dispatch => ({
    onTabClick: preferenceId => dispatch(push(generatePreferencePageRoute({
      preferenceId,
    }))),
    // send to general-settings when there is an unknown tab
    onUnknownTab: () => dispatch(push(generatePreferencePageRoute({
      preferenceId: 'general',
    }))),
    // go back to the last selected profile
    onBackToDashboardClick: ({ selectedProfileId, profiles }) => {
      const profileId = selectedProfileId || profiles[0].id;
      const profile = profiles.find(p => p.id === profileId);
      dispatch(profileSidebarActions.selectProfile({
        profile,
      }));
      dispatch(push(generateProfilePageRoute({
        profileId,
      })));
    },
  }),
)(Preferences);

export constants from './constants';
