import { connect } from 'react-redux';
import { actions } from './reducer';
import GeneralSettings from './components/GeneralSettings/index';

export default connect(
    state => ({

    }),
    (dispatch, ownProps) => ({
      onSetUpDirectPostingClick: () => {
        dispatch(actions.handleSetUpDirectPostingClick({
          profileId: ownProps.profileId,
        }));
      },
      showInstagramDirectPostingComponent: actions.showInstagramDirectPosting,
    }),
)(GeneralSettings);
export { actions, actionTypes } from './reducer';
export middleware from './middleware';
