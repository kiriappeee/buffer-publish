import { connect } from 'react-redux';
import { actions } from './reducer';
import GeneralSettings from './components/GeneralSettings';

export default connect(
    state => ({
      directPostingEnabled: state.generalSettings.directPostingEnabled,
      profileId: state.generalSettings.profileId,
      profileService: state.generalSettings.profileService,
      linkShorteners: state.generalSettings.linkShorteners,
      loadingLinkShorteners: state.generalSettings.loadingLinkShorteners,
      selectedShortener: state.generalSettings.selectedShortener,
    }),
    (dispatch, ownProps) => ({
      onSetUpDirectPostingClick: () => {
        dispatch(actions.handleSetUpDirectPostingClick({
          profileId: ownProps.profileId,
        }));
      },
      onLinkShortenerOptionSelect: (event) => {
        dispatch(actions.handleOnSelectLinkShortenerChange({
          profileId: ownProps.profileId,
          domain: event.target.value,
        }));
      },
    }),
)(GeneralSettings);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
