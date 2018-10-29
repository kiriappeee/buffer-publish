// component vs. container https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
import { connect } from 'react-redux';
// load the presentational component
import InitialLoading from './components/InitialLoading';

export default connect(
  dispatch => ({
    onComponentMount() {
      console.debug('Initial Loading mounted');
      dispatch({ type: 'profile_loading_redirect' });
    },
  }),
)(InitialLoading);
