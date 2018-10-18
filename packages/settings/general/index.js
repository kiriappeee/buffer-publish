import { connect } from 'react-redux';
import { actions } from './reducer';
import GeneralSettings from '../general/components/GeneralSettings/index';

export default connect(
    state => ({
      loading: state.settings.loading,
      translations: state.i18n.translations.settings, // all package translations
      showClearAllModal: state.settings.showClearAllModal,
      profileName: state.settings.profileName,
      profileType: state.settings.profileType,
      profileService: state.settings.profileService,
      avatar: state.settings.avatar,
    }),
    (dispatch, ownProps) => ({
      onSetUpDirectPostingClick: () => {
        dispatch(actions.handleSetUpDirectPostingClick({
          profileId: ownProps.profileId,
        }));
      },
    }),
)(GeneralSettings);
export { actions, actionTypes } from './reducer';
export middleware from './middleware';