import { connect } from 'react-redux';
import { actions } from './reducer';
import GeneralSettings from './components/GeneralSettings';

export default connect(
    state => ({
      direct_posting_enabled: state.generalSettings.direct_posting_enabled,
      profileId: state.generalSettings.profileId,
    }),
    (dispatch, ownProps) => ({
      onSetUpDirectPostingClick: () => {
        dispatch(actions.handleSetUpDirectPostingClick({
          profileId: ownProps.profileId,
        }));
      },
    }),
)(GeneralSettings);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
