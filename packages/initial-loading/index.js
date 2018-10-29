// component vs. container https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
import { connect } from 'react-redux';
import { actions } from './reducer';

// load the presentational component
import InitialLoading from './components/InitialLoading';

export default connect(
    null,
    dispatch => ({
      onCompomentMount: () => {
        dispatch(actions.profileLoadingRedirect());
      },
    }),
)(InitialLoading);

export reducer, { actions, actionTypes } from './reducer';
